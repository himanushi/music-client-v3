// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import SpotifyWebApi from "spotify-web-api-node";
import type { Sender } from "xstate";
import {
  Machine as machine, assign, sendParent, State
} from "xstate";
import {
  SpotifyTrack, Track
} from "~/graphql/types";
import { cookie } from "~/lib/cookie";
import {
  spotifyAccessToken,
  spotifyRefreshToken
} from "~/machines/spotify-account-machine";

export type SpotifyPlayerContext = {
  track?: Track;
  seek: number;
  deviceId?: string;
  accessToken?: string;
};

export type SpotifyPlayerStateSchema = {
  states: {
    initializing: {};
    idle: {};
    listening: {
      states: {
        connecting: {};
        loading: {};
        playing: {};
        paused: {};
      };
    };
    stopped: {};
    finished: {};
  };
};

export type SpotifyPlayerStateEvent =
  | { type: "CONNECTED" }
  | { type: "SET_TRACK"; track: Track }
  | { type: "SET_SEEK"; seek: number }
  | { type: "SET_DEVICE_ID"; deviceId: string }
  | { type: "SET_ACCESS_TOKEN"; accessToken: string }
  | { type: "CHANGE_SEEK"; seek: number }
  | { type: "IDLE" }
  | { type: "LOAD" }
  | { type: "PLAY" }
  | { type: "PLAYING" }
  | { type: "PAUSE" }
  | { type: "PAUSED" }
  | { type: "STOP" }
  | { type: "STOPPED" }
  | { type: "FINISHED" }
  | { type: "TICK" };

export const spotifyPlayerId = "spotify-player";
const playerName = "ゲーム音楽";

const getSpotify = () => {

  const accessToken = cookie.get(spotifyAccessToken);

  if (!accessToken) {

    return undefined;

  }

  return new SpotifyWebApi({ accessToken });

};

export const SpotifyPlayerMachine = machine<
  SpotifyPlayerContext,
  SpotifyPlayerStateSchema,
  SpotifyPlayerStateEvent
>(
  {
    context: { seek: 0 },

    id: spotifyPlayerId,

    initial: "initializing",

    on: {
      CHANGE_SEEK: { actions: [
        "changeSeek",
        sendParent(({ seek }) => ({
          seek,
          type: "SET_SEEK"
        }))
      ] },

      LOAD: { target: "listening" },

      SET_TRACK: { actions: ["setTrack"] },

      SET_SEEK: { actions: ["setSeek"] },

      SET_DEVICE_ID: { actions: ["setDeviceId"] },

      SET_ACCESS_TOKEN: { actions: ["setAccessToken"] },

      TICK: { actions: [
        "tick",
        sendParent(({ seek }) => ({
          seek,
          type: "SET_SEEK"
        }))
      ] },

      FINISHED: "finished"
    },

    states: {
      initializing: {
        invoke: { src: "polling" },
        on: { IDLE: "idle" }
      },

      idle: { invoke: { src: "appendScriptTag" } },

      listening: {
        initial: "connecting",

        invoke: { src: "connect" },

        states: {
          connecting: { on: { CONNECTED: "loading" } },

          loading: {
            invoke: { src: "load" },
            entry: [sendParent("LOADING")],
            on: {
              PLAYING: "playing",
              FINISHED: `#${spotifyPlayerId}.finished`
            }
          },

          paused: {
            invoke: { src: "disconnect" },
            entry: [sendParent("PAUSED")],
            on: {
              PLAY: { actions: ["replay"] },
              PLAYING: "playing",
              STOP: {
                actions: ["stop"],
                target: `#${spotifyPlayerId}.stopped`
              }
            }
          },

          playing: {
            invoke: { src: "disconnect" },
            entry: [sendParent("PLAYING")],
            on: {
              PAUSE: { actions: ["pause"] },
              PAUSED: "paused",
              STOP: {
                actions: ["stop"],
                target: `#${spotifyPlayerId}.stopped`
              }
            }
          }
        }
      },

      stopped: {
        entry: [sendParent("STOPPED")],
        on: { PLAY: "listening" }
      },

      finished: {
        entry: [sendParent("FINISHED")],
        on: { PLAY: "listening" }
      }
    }
  },
  {
    actions: {
      changeSeek: assign({ seek: (_, event) => {

        const spotify = getSpotify();
        if ("seek" in event && spotify) {

          spotify.seek(event.seek);
          return event.seek;

        }

        return 0;

      } }),

      setTrack: assign({ track: ({ track }, event) => "track" in event ? event.track : track }),

      setSeek: assign({ seek: ({ seek }, event) => "seek" in event ? event.seek : seek }),

      setDeviceId: assign({ deviceId: ({ deviceId }, event) => "deviceId" in event ? event.deviceId : deviceId }),

      setAccessToken: assign({ accessToken: ({ accessToken }, event) => "accessToken" in event ? event.accessToken : accessToken }),

      // Spotify api で毎秒再生時間を取得する方法が多分ない
      tick: assign({ seek: ({
        seek, track
      }) => {

        const nextSeek = seek + 1000;

        if (track && track.durationMs < nextSeek) {

          return seek;

        }

        return nextSeek;

      } }),

      replay: () => {

        const spotify = getSpotify();
        if (spotify) {

          spotify.play();

        }

      },

      pause: () => {

        const spotify = getSpotify();
        if (spotify) {

          spotify.pause();

        }

      },

      stop: () => {

        const spotify = getSpotify();
        if (spotify) {

          try {

            spotify.pause();

          } catch (error) {

            // eslint-disable-next-line no-console
            console.warn(error.message);

          }

        }

      }
    },

    services: {
      polling: () => (callback: Sender<SpotifyPlayerStateEvent>) => {

        const id = setInterval(() => {

          if (cookie.get(spotifyRefreshToken)) {

            callback("IDLE");

          }

        }, 1000);

        return () => clearInterval(id);

      },

      appendScriptTag: () => () => {

        // Spotify SDK 読み込み
        window.onSpotifyWebPlaybackSDKReady = () => {

          // eslint-disable-next-line no-console
          console.log("init Spotify");

        };

        const script = document.createElement("script");
        script.setAttribute("src", "https://sdk.scdn.co/spotify-player.js");
        script.setAttribute("type", "text/javascript");
        document.head.appendChild(script);

      },

      // eslint-disable-next-line max-lines-per-function
      connect: () => (callback: Sender<SpotifyPlayerStateEvent>) => {

        const accessToken = cookie.get(spotifyAccessToken);

        if (!accessToken) {

          callback("STOPPED");
          return;

        }

        callback({
          type: "SET_ACCESS_TOKEN",
          accessToken
        });

        const player = new Spotify.Player({
          name: playerName,
          getOAuthToken: (cb) => {

            cb(accessToken);

          }
        });

        player.addListener("player_state_changed", (state) => {

          // 正しい seek を設定
          if (state) {

            callback({
              type: "SET_SEEK",
              seek: state.position
            });

          }

          // FINISHED
          if (
            state &&
            state.paused &&
            state.track_window.previous_tracks.length === 0 &&
            state.position === 0
          ) {

            callback("FINISHED");

          } else if (
            state &&
            state.paused &&
            state.track_window.previous_tracks.length === 0 &&
            state.position !== 0
          ) {

            callback("PAUSED");

          } else if (state && !state.paused) {

            callback("PLAYING");

          }

        });

        player.addListener("ready", ({ device_id }) => {

          callback({
            type: "SET_DEVICE_ID",
            deviceId: device_id
          });

          callback("CONNECTED");

        });

        player.connect();

        return () => player.disconnect();

      },

      disconnect: (context: SpotifyPlayerContext) => (
        callback: Sender<SpotifyPlayerStateEvent>
      ) => {

        // access token の更新対応
        const id = setInterval(() => {

          const accessToken = cookie.get(spotifyAccessToken);

          if (context.accessToken !== accessToken) {

            callback({ type: "STOP" });

          }

        }, 60 * 1000);

        return () => clearInterval(id);

      },

      load: ({
        deviceId, track
      }: SpotifyPlayerContext) => (
        callback: Sender<SpotifyPlayerStateEvent>
      ) => {

        const id = track?.spotifyTracks?.find((st: SpotifyTrack) => st)?.
          spotifyId;

        if (!id || !deviceId) {

          callback("FINISHED");
          return;

        }

        (async () => {

          const spotify = getSpotify();
          if (spotify) {

            await spotify.play({
              device_id: deviceId,
              uris: [`spotify:track:${id}`]
            });

            callback({
              type: "SET_SEEK",
              seek: 0
            });

            callback("PLAYING");

          } else {

            callback("FINISHED");

          }

        })();

      }
    }
  }
);

export type SpotifyPlayerState = State<
  SpotifyPlayerContext,
  SpotifyPlayerStateEvent,
  SpotifyPlayerStateSchema,
  {
    value: any;
    context: SpotifyPlayerContext;
  }
>;

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
import { spotifyAccessToken } from "~/machines/spotify-account-machine";

export type SpotifyPlayerContext = {
  track?: Track;
  seek: number;
  deviceId?: string;
};

export type SpotifyPlayerStateSchema = {
  states: {
    idle: {};
    loading: {};
    playing: {};
    paused: {};
    stopped: {};
    finished: {};
  };
};

export type SpotifyPlayerStateEvent =
  | { type: "SET_TRACK"; track: Track }
  | { type: "SET_SEEK"; seek: number }
  | { type: "SET_DEVICE_ID"; deviceId: string }
  | { type: "CHANGE_SEEK"; seek: number }
  | { type: "LOAD" }
  | { type: "PLAY" }
  | { type: "PLAYING" }
  | { type: "PAUSE" }
  | { type: "PAUSED" }
  | { type: "STOP" }
  | { type: "STOPPED" }
  | { type: "FINISHED" }
  | { type: "TICK" };

export const SpotifyPlayerId = "spotify-player";

const getSpotify = () => {

  const accessToken = cookie.get(spotifyAccessToken);
  if (!accessToken) {

    return undefined;

  }

  return new SpotifyWebApi({ accessToken });

};

// eslint-disable-next-line max-lines-per-function
const connectSpotify = (callback: Sender<SpotifyPlayerStateEvent>) => {

  const accessToken = cookie.get(spotifyAccessToken);

  if (!accessToken) {

    callback("FINISHED");
    return;

  }

  const player = new Spotify.Player({
    name: "Spotify Player",
    getOAuthToken: (cb) => {

      cb(accessToken);

    }
  });

  player.addListener("player_state_changed", (state) => {

    console.log({ state });

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

  });

  player.connect();

};

export const SpotifyPlayerMachine = machine<
  SpotifyPlayerContext,
  SpotifyPlayerStateSchema,
  SpotifyPlayerStateEvent
>(
  {
    context: { seek: 0 },
    id: SpotifyPlayerId,

    initial: "idle",

    on: {
      CHANGE_SEEK: { actions: [
        "changeSeek",
        sendParent(({ seek }) => ({
          seek,
          type: "SET_SEEK"
        }))
      ] },

      LOAD: { target: "loading" },

      SET_TRACK: { actions: ["setTrack"] },

      SET_SEEK: { actions: ["setSeek"] },

      SET_DEVICE_ID: { actions: ["setDeviceId"] },

      TICK: { actions: [
        "tick",
        sendParent(({ seek }) => ({
          seek,
          type: "SET_SEEK"
        }))
      ] },

      FINISHED: "finished"
    },

    invoke: { src: () => (callback: Sender<SpotifyPlayerStateEvent>) => {

      // 初回以外の接続
      if (window.onSpotifyWebPlaybackSDKReady) {

        connectSpotify(callback);

      }

    } },

    states: {
      idle: { invoke: { src: () => (callback: Sender<SpotifyPlayerStateEvent>) => {

        // 初回接続
        window.onSpotifyWebPlaybackSDKReady = () => {

          // eslint-disable-next-line no-console
          console.log("init Spotify");
          connectSpotify(callback);

        };

        const script = document.createElement("script");
        script.setAttribute("src", "https://sdk.scdn.co/spotify-player.js");
        script.setAttribute("type", "text/javascript");
        document.head.appendChild(script);

      } } },

      loading: {
        invoke: { src: ({
          deviceId, track
        }) => (callback) => {

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

        } },

        entry: [sendParent("LOADING")],

        on: {
          PLAYING: "playing",
          FINISHED: "finished"
        }
      },

      paused: {
        entry: [sendParent("PAUSED")],
        on: {
          PLAY: { actions: ["replay"] },
          PLAYING: "playing",
          STOP: {
            actions: ["stop"],
            target: "stopped"
          }
        }
      },

      playing: {
        entry: [sendParent("PLAYING")],
        on: {
          PAUSE: { actions: ["pause"] },
          PAUSED: "paused",
          STOP: {
            actions: ["stop"],
            target: "stopped"
          }
        }
      },

      stopped: {
        entry: [sendParent("STOPPED")],
        on: { PLAY: "loading" }
      },

      finished: {
        entry: [sendParent("FINISHED")],
        on: { PLAY: "loading" }
      }
    }
  },
  { actions: {
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

        spotify.pause();

      }

    }
  } }
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

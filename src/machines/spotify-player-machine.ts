// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import SpotifyWebApi from "spotify-web-api-node";
import {
  Machine as machine, assign, sendParent, State
} from "xstate";
import {
  SpotifyTrack, Track
} from "~/graphql/types";
import { cookie } from "~/lib/cookie";
import {
  spotifyAccessToken,
  spotifyDeviceId
} from "~/machines/spotify-account-machine";

export type SpotifyPlayerContext = {
  track?: Track;
  seek: number;
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
      CHANGE_SEEK: { actions: ["changeSeek"] },

      LOAD: { target: "loading" },

      PLAY: {
        actions: ["play"],
        target: "playing"
      },

      PLAYING: "playing",

      SET_TRACK: { actions: ["setTrack"] },

      SET_SEEK: { actions: ["setSeek"] },

      STOP: {
        actions: ["stop"],
        target: "stopped"
      },

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
      // eslint-disable-next-line max-lines-per-function
      idle: { invoke: { src: () => (callback) => {

        const accessToken = cookie.get(spotifyAccessToken);

        // eslint-disable-next-line max-lines-per-function
        window.onSpotifyWebPlaybackSDKReady = () => {

          if (!accessToken) {

            console.log("Not found spotify token!!");
            return;

          }

          const player = new Spotify.Player({
            name: "Spotify Player",
            getOAuthToken: (cb) => {

              cb(accessToken);

            }
          });

          player.addListener("player_state_changed", (state) => {

            // seek 更新
            callback({
              type: "SET_SEEK",
              seek: state.position
            });

            console.log({ state });

            // FINISHED
            if (
              state.paused &&
                  state.position === 0 &&
                  state.track_window.previous_tracks.length === 0
            ) {

              callback("FINISHED");

            }

          });

          player.addListener("ready", ({ device_id }) => {

            console.log("init Spotify");
            cookie.set(spotifyDeviceId, device_id, { expires: 7 });

          });

          player.connect();

        };

        const script = document.createElement("script");
        script.setAttribute("src", "https://sdk.scdn.co/spotify-player.js");
        script.setAttribute("type", "text/javascript");
        document.head.appendChild(script);

      } } },

      loading: {
        invoke: { src: ({ track }) => (callback) => {

          const id = track?.spotifyTracks?.find((st: SpotifyTrack) => st)?.
            spotifyId;

          if (!id) {

            callback("FINISHED");
            return;

          }

          (async () => {

            const device_id = cookie.get(spotifyDeviceId);
            const spotify = getSpotify();
            if (spotify) {

              await spotify.play({
                device_id,
                uris: [`spotify:track:${id}`]
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

      paused: { entry: [sendParent("PAUSED")] },

      playing: { entry: [sendParent("PLAYING")] },

      stopped: { entry: [sendParent("STOPPED")] },

      finished: { entry: [sendParent("FINISHED")] }
    }
  },
  { actions: {
    changeSeek: (_, event) => {

      const spotify = getSpotify();
      if ("seek" in event && spotify) {

        spotify.seek(event.seek);

      }

    },

    setTrack: assign({ track: ({ track }, event) => "track" in event ? event.track : track }),

    setSeek: assign({ seek: ({ seek }, event) => "seek" in event ? event.seek : seek }),

    // Spotify api で毎秒再生時間を取得する方法が多分ない
    tick: assign({ seek: ({ seek }) => seek + 1000 })
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

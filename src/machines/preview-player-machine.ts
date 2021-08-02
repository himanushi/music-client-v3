// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable max-lines-per-function */

import { Howl } from "howler";
import {
  Machine as machine, assign, send, sendParent, State
} from "xstate";

const setPlayer = (previewUrl?: string) => {

  if (!previewUrl) {

    return undefined;

  }

  const howl: Howl = new Howl({
    autoplay: false,
    html5: true,
    preload: false,
    src: previewUrl,
    volume: 0
  });

  return howl;

};

export type PreviewPlayerContext = {
  previewUrl?: string;
  player?: Howl;
  seek: number;
};

export type PreviewPlayerStateSchema = {
  states: {
    idle: {};
    loading: {};
    playing: {};
    paused: {};
    stopped: {};
    finished: {};
  };
};

export type PreviewPlayerStateEvent =
  | { type: "SET_DATA"; data: string }
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

export const PreviewPlayerMachine = machine<
  PreviewPlayerContext,
  PreviewPlayerStateSchema,
  PreviewPlayerStateEvent
>(
  {
    context: { seek: 0 },
    id: "preview",

    initial: "idle",

    states: {
      finished: { entry: [sendParent("FINISHED")] },

      idle: {},

      loading: {
        entry: [
          sendParent("LOADING"),
          "stop"
        ],

        after: { 0: { actions: [send("PLAYING")] } },

        exit: [
          "setPlayer",
          "play"
        ]
      },

      paused: { entry: [sendParent("PAUSED")] },

      playing: {
        entry: [sendParent("PLAYING")],
        invoke: {
          id: "playingListener",

          src:
            ({ player }: PreviewPlayerContext) => (callback) => {

              if (player) {

                player.on("pause", () => callback("PAUSED"));

                player.on("end", () => callback("FINISHED"));

                // ref: https://stackoverflow.com/questions/45802988/typescript-use-correct-version-of-settimeout-node-vs-window
                let timeoutID: ReturnType<typeof setTimeout>;
                const volume = 0.3;
                const fadeouttime = 2000;

                const fadeIn = () => {

                  if (player.volume() === 0) {

                    player.fade(0, volume, fadeouttime);

                  } else {

                    player.volume(volume);

                  }

                };

                const setScheduleFadeOut = () => {

                  const seek = player.seek() as number;

                  const time = (player.duration() - seek) as number;

                  const ms = time * 1000;

                  const timeout = ms - fadeouttime;

                  timeoutID = setTimeout(() => {

                    player.fade(volume, 0, fadeouttime);

                  }, timeout);

                };

                player.on("play", () => {

                  fadeIn();
                  setScheduleFadeOut();

                });

                player.on("seek", () => {

                  clearTimeout(timeoutID);
                  setScheduleFadeOut();

                });

                return () => {

                  clearTimeout(timeoutID);
                  player.off("play");
                  player.off("pause");
                  player.off("end");
                  player.off("seek");

                };

              }

              return () => {
                // 何もしない
              };

            }
        },
        on: {
          FINISHED: "finished",
          PAUSE: { actions: ["pause"] },
          PAUSED: "paused"
        }
      },

      stopped: {
        entry: [sendParent("STOPPED")],
        exit: ["setPlayer"]
      }
    },

    on: {
      CHANGE_SEEK: { actions: ["changeSeek"] },

      LOAD: "loading",

      PLAY: {
        actions: ["play"],
        target: "playing"
      },

      PLAYING: "playing",

      SET_DATA: { actions: ["setData"] },

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
      ] }
    }
  },
  { actions: {
    changeSeek: ({ player }, event) => {

      if (player && "seek" in event) {

        player.seek(event.seek / 1000);

      }

    },

    pause: ({ player }) => {

      if (player && player.playing()) {

        player.pause();

      }

    },

    play: ({ player }) => {

      if (player) {

        player.play();

      }

    },

    setPlayer: assign({ player: ({ previewUrl }) => setPlayer(previewUrl) }),

    setData: assign({ previewUrl: (_, event) => "data" in event ? event.data : undefined }),

    stop: ({ player }) => {

      if (player && player.playing()) {

        player.stop();

      }

    },

    tick: assign({ seek: ({ player }) => {

      if (player) {

        const seek = player.seek() as number;
        return Math.floor(seek * 1000);

      }

      return 0;

    } })
  } }
);

export type PreviewPlayerState = State<
  PreviewPlayerContext,
  PreviewPlayerStateEvent,
  PreviewPlayerStateSchema,
  {
    value: any;
    context: PreviewPlayerContext;
  }
>;

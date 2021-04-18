import { Howl } from "howler";
import {
  Machine as machine, assign, send, sendParent, State
} from "xstate";
import { Track } from "~/graphql/types";

const setPlayer = (track: Track) => {
  if (!track || !track.previewUrl) {
    return undefined;
  }

  const howl: Howl = new Howl({
    "autoplay": false,
    "html5": true,
    "preload": false,
    "src": track.previewUrl,
    "volume": 0
  });

  return howl;
};

export type PreviewPlayerContext = {
  track?: Track;
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
  | { type: "SET_TRACK"; track: Track }
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
    "context": {
      "player": undefined,
      "seek": 0,
      "track": undefined
    },
    "id": "preview",

    "initial": "idle",

    "on": {
      "CHANGE_SEEK": { "actions": ["changeSeek"] },

      "LOAD": { "target": "loading" },

      "PLAY": {
        "actions": ["play"],
        "target": "playing"
      },

      "PLAYING": "playing",

      "SET_TRACK": { "actions": ["setTrack"] },

      "STOP": {
        "actions": ["stop"],
        "target": "stopped"
      },

      "TICK": { "actions": [
        "tick",
        sendParent(({ seek }) => ({
          seek,
          "type": "SET_SEEK"
        }))
      ] }
    },
    "states": {
      "finished": { "entry": [sendParent("FINISHED")] },

      "idle": {},

      "loading": {
        "entry": [
          "stop",
          send("PLAYING")
        ],
        "exit": [
          "setPlayer",
          "play"
        ]
      },

      "paused": { "entry": [sendParent("PAUSED")] },

      "playing": {
        "entry": [sendParent("PLAYING")],
        "invoke": {
          "id": "playingListener",

          // eslint-disable-next-line max-lines-per-function
          "src": ({ player }: PreviewPlayerContext) => (callback) => {
            if (player) {
              player.on("pause", () => callback("PAUSED"));

              player.on("end", () => callback("FINISHED"));

              let timeoutID: number;
              const volume = 0.5;
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
        "on": {
          "FINISHED": "finished",
          "PAUSE": { "actions": ["pause"] },
          "PAUSED": "paused"
        }
      },

      "stopped": {
        "entry": [sendParent("STOPPED")],
        "exit": ["setPlayer"]
      }
    }
  },
  { "actions": {
    "changeSeek": ({ player }, event) => {
      if (player && "seek" in event) {
        player.seek(event.seek / 1000);
      }
    },

    "pause": ({ player }) => {
      if (player && player.playing()) {
        player.pause();
      }
    },

    "play": ({ player }) => {
      if (player) {
        player.play();
      }
    },

    "setPlayer": assign({ "player": ({ track }) => {
      if (track) {
        return setPlayer(track);
      }

      return undefined;
    } }),

    "setTrack": assign({ "track": (_, event) => {
      if ("track" in event) {
        return event.track;
      }

      return undefined;
    } }),

    "stop": ({ player }) => {
      if (player && player.playing()) {
        player.stop();
      }
    },

    "tick": assign({ "seek": ({ player }) => {
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

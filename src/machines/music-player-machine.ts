import {
  Machine as machine,
  SpawnedActorRef,
  State,
  assign,
  send,
  spawn
} from "xstate";
import { sendParent } from "xstate/lib/actions";
import { Track } from "~/graphql/types";
import {
  PreviewPlayerMachine,
  PreviewPlayerState,
  PreviewPlayerStateEvent
} from "~/machines/preview-player-machine";

export type MusicPlayerContext = {
  previewPlayerRef?: SpawnedActorRef<
    PreviewPlayerStateEvent,
    PreviewPlayerState
  >;
  track?: Track;
  duration: number;
  seek: number;
};

export type MusicPlayerSchema = {
  states: {
    idle: {};
    loading: {};
    playing: {};
    paused: {};
    stopped: {};
    finished: {};
  };
};

export type MusicPlayerEvent =
  | { type: "SET_TRACK"; track: Track }
  | { type: "SET_DURATION"; duration: number }
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

export const MusicPlayerMachine = machine<
  MusicPlayerContext,
  MusicPlayerSchema,
  MusicPlayerEvent
>(
  {
    "context": {
      "duration": 0,
      "previewPlayerRef": undefined,
      "seek": 0,
      "track": undefined
    },

    "id": "musicPlayer",

    "initial": "idle",

    "on": {
      "CHANGE_SEEK": { "actions": [
        "changeSeek",
        "changeSeekPreview"
      ] },

      "LOAD": {
        "actions": ["loadPreview"],
        "target": "loading"
      },

      "SET_SEEK": { "actions": ["setSeek"] },

      "SET_TRACK": { "actions": [
        "resetSeek",
        "setTrack",
        "setDuration",
        "setTrackToPreview"
      ] },

      "STOP": { "actions": [
        "stopPreview",
        "resetSeek"
      ] },

      "STOPPED": "stopped"
    },
    "states": {
      "finished": { "entry": [
        "resetSeek",
        sendParent("NEXT_PLAY")
      ] },

      "idle": { "entry": ["initPlayers"] },

      "loading": { "on": { "PLAYING": "playing" } },

      "paused": {
        "entry": [sendParent("PAUSED")],
        "on": {
          "PLAY": { "actions": ["playPreview"] },
          "PLAYING": "playing"
        }
      },

      "playing": {
        "entry": [
          sendParent("PLAYING"),
          "setDuration"
        ],
        "invoke": {
          "id": "seekTimer",
          "src": (_) => (callback) => {
            const interval = setInterval(() => callback("TICK"), 1000);

            return () => {
              clearInterval(interval);
            };
          }
        },
        "on": {
          "FINISHED": "finished",
          "PAUSE": { "actions": ["pausePreview"] },
          "PAUSED": "paused",
          "TICK": { "actions": ["tickPreview"] }
        }
      },

      "stopped": {
        "entry": [sendParent("STOPPED")],
        "on": {
          "PLAY": { "actions": ["playPreview"] },
          "PLAYING": "playing"
        }
      }
    }
  },
  { "actions": {
    "changeSeek": assign({ "seek": (_, event) => {
      if ("seek" in event) {
        return event.seek;
      }
      return 0;
    } }),

    "changeSeekPreview": send(
      (_, event) => {
        if ("seek" in event) {
          return {
            "seek": event.seek,
            "type": "CHANGE_SEEK"
          };
        }
        return { "type": "" };
      },
      { "to": "preview" }
    ),

    "initPlayers": assign({ "previewPlayerRef": (_) => spawn(PreviewPlayerMachine, "preview") }),

    "loadPreview": send("LOAD", { "to": "preview" }),

    "pausePreview": send("PAUSE", { "to": "preview" }),

    "playPreview": send("PLAY", { "to": "preview" }),

    "resetSeek": assign({ "seek": (_) => 0 }),

    "setDuration": assign({ "duration": ({ track }) => {
      if (!track) {
        return 0;
      }
      if (track.durationMs > 30000) {
        return 30000;
      }
      return track.durationMs;
    } }),

    "setSeek": assign({ "seek": (_, event) => {
      if ("seek" in event) {
        return event.seek;
      }
      return 0;
    } }),

    "setTrack": assign({ "track": (_, event) => {
      if ("track" in event) {
        return event.track;
      }
      return undefined;
    } }),

    // /////// PreviewPlayer /////////
    "setTrackToPreview": send(
      (_, event) => {
        if ("track" in event) {
          return {
            "track": event.track,
            "type": "SET_TRACK"
          };
        }

        return { "type": "" };
      },
      { "to": "preview" }
    ),

    "stopPreview": send("STOP", { "to": "preview" }),

    "tickPreview": send("TICK", { "to": "preview" })
  } }
);

export type MusicPlayerState = State<
  MusicPlayerContext,
  MusicPlayerEvent,
  MusicPlayerSchema,
  {
    value: any;
    context: MusicPlayerContext;
  }
>;

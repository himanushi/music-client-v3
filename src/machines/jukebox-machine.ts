// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

// import { inspect } from "@xstate/inspect";
import {
  Machine as machine,
  SpawnedActorRef,
  State,
  assign,
  interpret,
  send,
  spawn
} from "xstate";
import { Track } from "~/graphql/types";
import {
  MusicPlayerEvent,
  MusicPlayerMachine,
  MusicPlayerState
} from "~/machines/music-player-machine";

export type JukeboxContext = {
  name: string;
  currentPlaybackNo: number;
  tracks: Track[];
  currentTrack?: Track;
  repeat: boolean;
  musicPlayerRef?: SpawnedActorRef<MusicPlayerEvent, MusicPlayerState>;
};

export type JukeboxSchema = {
  states: {
    idle: {};
    loading: {};
    playing: {};
    paused: {};
    stopped: {};
  };
};

// ref: https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
const move = (arr: any[], from: number, to: number) => {

  let old_index = from;
  let new_index = to;

  while (old_index < 0) {

    old_index += arr.length;

  }
  while (new_index < 0) {

    new_index += arr.length;

  }
  if (new_index >= arr.length) {

    let length = new_index - arr.length + 1;
    // eslint-disable-next-line no-plusplus
    while (length--) {

      arr.push(undefined);

    }

  }

  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;

};

export type JukeboxEvent =
  // Queue
  | { type: "SET_NAME"; name: string }
  | {
      type: "REPLACE_AND_PLAY";
      tracks: JukeboxContext["tracks"];
      currentPlaybackNo: JukeboxContext["currentPlaybackNo"];
    }
  | {
      type: "MOVE";
      from: number;
      to: number;
    }
  | {
      type: "REMOVE";
      removeIndex: number;
    }
  | { type: "SHUFFLE" }
  // Player
  | { type: "PLAY" }
  | { type: "PLAY_OR_PAUSE" }
  | { type: "CHANGE_PLAYBACK_NO"; currentPlaybackNo: number }
  | { type: "NEXT_PLAY" }
  | { type: "PREVIOUS_PLAY" }
  | { type: "PLAYING" }
  | { type: "PAUSE" }
  | { type: "PAUSED" }
  | { type: "STOP" }
  | { type: "STOPPED" }
  | { type: "REPEAT" };

export const JukeboxMachine = machine<
  JukeboxContext,
  JukeboxSchema,
  JukeboxEvent
>(
  {
    context: {
      currentPlaybackNo: 0,
      name: "",
      repeat: false,
      tracks: []
    },

    id: "jukebox",

    initial: "idle",

    invoke: {
      id: "mediaController",
      src: () => (callback) => {

        if (navigator.mediaSession) {

          navigator.mediaSession.setActionHandler("play", () => callback("PLAY")
          );
          navigator.mediaSession.setActionHandler("pause", () => callback("PAUSE")
          );
          navigator.mediaSession.setActionHandler("nexttrack", () => callback("NEXT_PLAY")
          );
          navigator.mediaSession.setActionHandler("previoustrack", () => callback("PREVIOUS_PLAY")
          );

        }

      }
    },

    states: {
      idle: { entry: ["initMusicPlayer"] },

      loading: {
        entry: [
          "setTrack",
          "load"
        ],
        on: { PLAYING: "playing" }
      },

      playing: {
        entry: ["setMediaMetadata"],
        on: {
          PAUSE: { actions: ["pause"] },
          PAUSED: "paused",
          PLAY_OR_PAUSE: { actions: ["pause"] }
        }
      },

      paused: { on: {
        PLAY: { actions: ["play"] },
        PLAYING: "playing",
        PLAY_OR_PAUSE: { actions: ["play"] }
      } },

      stopped: { on: {
        PLAY: { actions: ["play"] },
        PLAYING: "playing",
        PLAY_OR_PAUSE: { actions: ["play"] }
      } }
    },

    on: {
      CHANGE_PLAYBACK_NO: {
        actions: [
          "changePlaybackNo",
          "changeCurrentTrack"
        ],
        target: "loading"
      },

      MOVE: { actions: ["moveTracks"] },

      NEXT_PLAY: [
        {
          actions: [
            "nextPlaybackNo",
            "changeCurrentTrack"
          ],
          cond: "canNextPlay",
          target: "loading"
        },
        { actions: [
          "nextPlaybackNo",
          "changeCurrentTrack",
          "stop",
          "setTrack"
        ] }
      ],

      PREVIOUS_PLAY: [
        {
          actions: [
            "previousPlaybackNo",
            "changeCurrentTrack"
          ],
          cond: "canPreviousPlay",
          target: "loading"
        },
        { actions: [
          "previousPlaybackNo",
          "changeCurrentTrack",
          "stop",
          "setTrack"
        ] }
      ],

      REMOVE: { actions: ["removeTrack"] },

      REPEAT: { actions: ["repeat"] },

      REPLACE_AND_PLAY: {
        actions: [
          "replaceTracks",
          "changePlaybackNo",
          "changeCurrentTrack"
        ],
        target: "loading"
      },

      SET_NAME: { actions: ["setName"] },

      STOPPED: "stopped"
    }
  },
  {
    actions: {
      changeCurrentTrack: assign(({
        tracks, currentPlaybackNo
      }) => ({ currentTrack: tracks[currentPlaybackNo] })),

      changePlaybackNo: assign((_, event) => {

        if ("currentPlaybackNo" in event) {

          return { currentPlaybackNo: event.currentPlaybackNo };

        }

        return {};

      }),

      initMusicPlayer: assign({ musicPlayerRef: (_) => spawn(MusicPlayerMachine, "musicPlayer") }),

      load: send("LOAD", { to: "musicPlayer" }),

      nextPlaybackNo: assign({ currentPlaybackNo: ({
        tracks, currentPlaybackNo
      }) => currentPlaybackNo + 1 === tracks.length ? 0 : currentPlaybackNo + 1 }),

      pause: send("PAUSE", { to: "musicPlayer" }),

      play: send("PLAY", { to: "musicPlayer" }),

      previousPlaybackNo: assign({ currentPlaybackNo: ({ currentPlaybackNo }) => currentPlaybackNo === 0 ? 0 : currentPlaybackNo - 1 }),

      removeTrack: assign({
        currentPlaybackNo: (context, event) => {

          if (
            "removeIndex" in event &&
            context.currentPlaybackNo > event.removeIndex
          ) {

            return context.currentPlaybackNo - 1;

          }

          return context.currentPlaybackNo;

        },

        tracks: (context, event) => {

          if ("removeIndex" in event) {

            return context.tracks.filter(
              (_, index) => index !== event.removeIndex
            );

          }
          return context.tracks;

        }
      }),

      repeat: assign({ repeat: ({ repeat }) => !repeat }),

      replaceTracks: assign({ tracks: (_, event) => "tracks" in event ? event.tracks : [] }),

      moveTracks: assign({
        currentPlaybackNo: ({ currentPlaybackNo }, event) => {

          if ("from" in event && "to" in event) {

            if (currentPlaybackNo === event.from) {

              return event.to;

            } else if (
              event.from < currentPlaybackNo &&
              currentPlaybackNo <= event.to
            ) {

              return currentPlaybackNo - 1;

            } else if (
              event.from > currentPlaybackNo &&
              currentPlaybackNo >= event.to
            ) {

              return currentPlaybackNo + 1;

            }

          }

          return currentPlaybackNo;

        },
        tracks: ({ tracks }, event) => {

          if ("from" in event && "to" in event) {

            return move(tracks, event.from, event.to);

          }

          return tracks;

        }
      }),

      setMediaMetadata: ({ currentTrack }) => {

        if (navigator.mediaSession) {

          if (currentTrack) {

            navigator.mediaSession.metadata = new MediaMetadata({
              artwork: [
                {
                  sizes: "300x300",
                  src: currentTrack.artworkM.url || "",
                  type: "image/png"
                }
              ],
              title: currentTrack.name
            });

          }

        }

      },

      setName: assign({ name: (_, event) => "name" in event ? event.name : "" }),

      setTrack: send(
        ({ currentTrack }) => ({
          track: currentTrack,
          type: "SET_TRACK"
        }),
        { to: "musicPlayer" }
      ),

      stop: send("STOP", { to: "musicPlayer" })
    },

    guards: {
      canNextPlay: ({
        repeat, tracks, currentPlaybackNo
      }) => repeat || currentPlaybackNo + 1 !== tracks.length,
      canPreviousPlay: ({ currentPlaybackNo }) => currentPlaybackNo !== 0
    }
  }
);

export type JukeboxState = State<
  JukeboxContext,
  JukeboxEvent,
  JukeboxSchema,
  {
    value: any;
    context: JukeboxContext;
  }
>;

// inspect({ iframe: false });

export const playerService = interpret(JukeboxMachine).start();

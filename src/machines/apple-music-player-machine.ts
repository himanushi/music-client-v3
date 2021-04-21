import {
  Machine as machine, assign, send, sendParent, State
} from "xstate";
import { Track } from "~/graphql/types";

export type AppleMusicPlayerContext = {
  track?: Track;
  seek: number;
};

export type AppleMusicPlayerStateSchema = {
  states: {
    idle: {};
    loading: {};
    playing: {};
    paused: {};
    stopped: {};
    finished: {};
  };
};

export type AppleMusicPlayerStateEvent =
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

export const AppleMusicPlayerMachine = machine<
  AppleMusicPlayerContext,
  AppleMusicPlayerStateSchema,
  AppleMusicPlayerStateEvent
>(
  {
    context: { seek: 0 },
    id: "apple-music-player",

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
    },
    states: {
      finished: { entry: [sendParent("FINISHED")] },

      idle: {},

      loading: {

        /*
         * states: {
         *   initial: "idle",
         */

        entry: [
          "stop",
          send("PLAYING")
        ],
        exit: [
          "setPlayer",
          "play"
        ]
      },

      paused: { entry: [sendParent("PAUSED")] },

      playing: {
        entry: [sendParent("PLAYING")],
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
    }
  },
  { actions: {
    changeSeek: (_, event) => {

      if ("seek" in event) {

        MusicKit.getInstance().player.seekToTime(event.seek / 1000);

      }

    },

    pause: (_) => {

      MusicKit.getInstance().pause();

    },

    play: (_) => {

      MusicKit.getInstance().play();

    },

    setPlayer: (context) => {

      const id = context.track?.appleMusicTracks?.find((track) => track)?.
        appleMusicId;

      if (id) {

        return MusicKit.getInstance().setQueue({ songs: [id] });

      }

      return undefined;

    },

    setTrack: assign({ track: (_, event) => {

      if ("track" in event) {

        return event.track;

      }

      return undefined;

    } }),

    stop: (_) => {

      MusicKit.getInstance().stop();

    },

    tick: assign({ seek: (_) => {

      const seek = MusicKit.getInstance().player.currentPlaybackTime;
      return Math.floor(seek * 1000);

    } })
  } }
);

export type AppleMusicPlayerState = State<
  AppleMusicPlayerContext,
  AppleMusicPlayerStateEvent,
  AppleMusicPlayerStateSchema,
  {
    value: any;
    context: AppleMusicPlayerContext;
  }
>;

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
  AppleMusicPlayerMachine,
  AppleMusicPlayerState,
  AppleMusicPlayerStateEvent
} from "~/machines/apple-music-player-machine";
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
  appleMusicPlayerRef?: SpawnedActorRef<
    AppleMusicPlayerStateEvent,
    AppleMusicPlayerState
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
  | { type: "LOADING" }
  | { type: "PLAY" }
  | { type: "PLAYING" }
  | { type: "PAUSE" }
  | { type: "PAUSED" }
  | { type: "STOP" }
  | { type: "STOPPED" }
  | { type: "FINISHED" }
  | { type: "TICK" };

const previewPlayerId = "preview";
const appleMusicPlayerId = "apple-music-player";

const selectPlayer = (context: MusicPlayerContext) => {

  let appleAuth = false;
  try {

    appleAuth = MusicKit.getInstance().isAuthorized;

  } catch (error) {

    // eslint-disable-next-line no-console
    console.error(error.message);

  }

  if (
    appleAuth &&
    context.track?.appleMusicTracks?.find((track) => track)?.appleMusicId
  ) {

    return appleMusicPlayerId;

  }

  return previewPlayerId;

};

export const MusicPlayerMachine = machine<
  MusicPlayerContext,
  MusicPlayerSchema,
  MusicPlayerEvent
>(
  {
    context: {
      duration: 0,
      seek: 0
    },

    id: "musicPlayer",

    initial: "idle",

    on: {
      CHANGE_SEEK: { actions: [
        "changeSeek",
        "changeSeekToPlayer"
      ] },

      LOAD: {
        actions: [
          "stopToPlayers",
          "loadToPlayer"
        ],
        target: "loading"
      },

      LOADING: "loading",

      SET_SEEK: { actions: ["setSeek"] },

      SET_TRACK: { actions: [
        "resetSeek",
        "setTrack",
        "setDuration",
        "setTrackToPlayer"
      ] },

      STOP: { actions: [
        "stopToPlayers",
        "resetSeek"
      ] },

      STOPPED: "stopped"
    },
    states: {
      finished: { entry: [
        "resetSeek",
        sendParent("NEXT_PLAY")
      ] },

      idle: { entry: ["initPlayers"] },

      loading: { on: { PLAYING: "playing" } },

      paused: {
        entry: [sendParent("PAUSED")],
        on: {
          FINISHED: "finished",
          PLAY: { actions: ["playToPlayer"] },
          PLAYING: "playing"
        }
      },

      playing: {
        entry: [
          sendParent("PLAYING"),
          "setDuration"
        ],
        invoke: {
          id: "seekTimer",
          src: () => (callback) => {

            const interval = setInterval(() => callback("TICK"), 1000);

            return () => {

              clearInterval(interval);

            };

          }
        },
        on: {
          FINISHED: "finished",
          PAUSE: { actions: ["pauseToPlayers"] },
          PAUSED: "paused",
          TICK: { actions: ["tickToPlayer"] }
        }
      },

      stopped: {
        entry: [sendParent("STOPPED")],
        on: {
          PLAY: { actions: ["playToPlayer"] },
          PLAYING: "playing"
        }
      }
    }
  },
  { actions: {
    changeSeek: assign({ seek: (_, event) => {

      if ("seek" in event) {

        return event.seek;

      }
      return 0;

    } }),

    changeSeekToPlayer: send(
      (_, event) => {

        if ("seek" in event) {

          return {
            seek: event.seek,
            type: "CHANGE_SEEK"
          };

        }
        return { type: "" };

      },
      { to: selectPlayer }
    ),

    initPlayers: assign({
      appleMusicPlayerRef: (_) => spawn(AppleMusicPlayerMachine, appleMusicPlayerId),
      previewPlayerRef: (_) => spawn(PreviewPlayerMachine, previewPlayerId)
    }),

    loadToPlayer: send("LOAD", { to: selectPlayer }),

    /*
     * 一時停止する場合は再生中のプレイヤーのみですべきだが、面倒なので全てのプレイヤーに対して行う
     * いつかリファクタすること
     */
    pauseToPlayers: (context) => {

      context.previewPlayerRef?.send({ type: "PAUSE" });
      context.appleMusicPlayerRef?.send({ type: "PAUSE" });

    },

    playToPlayer: send("PLAY", { to: selectPlayer }),

    resetSeek: assign({ seek: (_) => 0 }),

    setDuration: assign({ duration: (context) => {

      if (!context.track) {

        return 0;

      }

      if (
        selectPlayer(context) === previewPlayerId &&
            context.track.durationMs > 30000
      ) {

        return 30000;

      }
      return context.track.durationMs;

    } }),

    setSeek: assign({ seek: (_, event) => {

      if ("seek" in event) {

        return event.seek;

      }
      return 0;

    } }),

    setTrack: assign({ track: (_, event) => {

      if ("track" in event) {

        return event.track;

      }
      return undefined;

    } }),

    setTrackToPlayer: send(
      (_, event) => {

        if ("track" in event) {

          return {
            track: event.track,
            type: "SET_TRACK"
          };

        }

        return { type: "" };

      },
      { to: selectPlayer }
    ),

    /*
     * 停止する場合は再生中のプレイヤーのみですべきだが、面倒なので全てのプレイヤーに対して行う
     * いつかリファクタすること
     */
    stopToPlayers: (context) => {

      context.previewPlayerRef?.send({ type: "STOP" });
      context.appleMusicPlayerRef?.send({ type: "STOP" });

    },

    tickToPlayer: send("TICK", { to: selectPlayer })
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

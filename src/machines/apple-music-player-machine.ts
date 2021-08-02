// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import {
  Machine as machine, assign, sendParent, State
} from "xstate";

export type AppleMusicPlayerContext = {
  id?: string;
  seek: number;
};

export type AppleMusicPlayerStateSchema = {
  states: {
    idle: {};
    loading: {
      states: {
        stopping: {};
        queueing: {};
        fetching: {};
      };
    };
    waiting: {};
    playing: {};
    paused: {};
    stopped: {};
    finished: {};
  };
};

const setEvents = (callback: any, events: string[][]) => {

  // eslint-disable-next-line no-unused-vars
  const didChange: (state: { oldState: number; state: number }) => any = (
    state
  ) => {

    events.forEach((event) => {

      if (MusicKit.PlaybackStates[state.state] === event[0]) {

        callback(event[1]);

      }

    });

  };

  MusicKit.getInstance().addEventListener("playbackStateDidChange", didChange);

  return () => {

    MusicKit.getInstance().removeEventListener(
      "playbackStateDidChange",
      didChange
    );

  };

};

export type AppleMusicPlayerStateEvent =
  | { type: "SET_DATA"; data: string }
  | { type: "CHANGE_SEEK"; seek: number }
  | { type: "LOAD" }
  | { type: "WAITING" }
  | { type: "PLAY" }
  | { type: "PLAYING" }
  | { type: "PAUSE" }
  | { type: "PAUSED" }
  | { type: "STOP" }
  | { type: "STOPPED" }
  | { type: "FINISHED" }
  | { type: "TICK" };

export const appleMusicPlayerId = "apple-music-player";

export const AppleMusicPlayerMachine = machine<
  AppleMusicPlayerContext,
  AppleMusicPlayerStateSchema,
  AppleMusicPlayerStateEvent
>(
  {
    context: { seek: 0 },

    id: appleMusicPlayerId,

    initial: "idle",

    on: {
      CHANGE_SEEK: { actions: ["changeSeek"] },

      LOAD: { target: "loading" },

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
    },

    states: {
      idle: {},

      loading: {
        initial: "stopping",

        states: {
          stopping: { invoke: {
            src: async () => {

              if (
                MusicKit.PlaybackStates.playing ===
                  MusicKit.getInstance().playbackState
              ) {

                await MusicKit.getInstance().stop();

              }

              MusicKit.getInstance().volume = 0.3;

            },

            onDone: "queueing"
          } },

          queueing: { invoke: {
            src: async (context) => {

              const { id } = context;

              if (id) {

                await MusicKit.getInstance().setQueue({ songs: [id] });

              }

            },

            onDone: "fetching"
          } },

          fetching: {
            entry: ["play"],
            on: { PLAYING: `#${appleMusicPlayerId}.playing` },
            invoke: { src: () => (callback) => setEvents(callback, [
              [
                "playing",
                "PLAYING"
              ]
            ]) }
          }
        }
      },

      waiting: {
        entry: [sendParent("LOADING")],

        invoke: { src: () => (callback) => setEvents(callback, [
          [
            "playing",
            "PLAYING"
          ]
        ]) },

        on: { PLAYING: "playing" }
      },

      paused: {
        entry: [sendParent("PAUSED")],
        invoke: { src: () => (callback) => setEvents(callback, [
          [
            "ended",
            "FINISHED"
          ],
          [
            "loading",
            "WAITING"
          ]
        ]) },

        on: {
          FINISHED: "finished",
          WAITING: "waiting"
        }
      },

      playing: {
        invoke: { src: () => (callback) => setEvents(callback, [
          [
            "paused",
            "PAUSED"
          ],
          [
            "waiting",
            "WAITING"
          ]
        ]) },

        entry: [sendParent("PLAYING")],

        on: {
          PAUSE: { actions: ["pause"] },
          PAUSED: "paused",
          WAITING: "waiting"
        }
      },

      stopped: { entry: [sendParent("STOPPED")] },

      finished: { entry: [sendParent("FINISHED")] }
    }
  },
  { actions: {
    changeSeek: (_, event) => {

      if ("seek" in event) {

        MusicKit.getInstance().seekToTime(event.seek / 1000);

      }

    },

    pause: () => {

      MusicKit.getInstance().pause();

    },

    play: () => {

      MusicKit.getInstance().play();

    },

    setData: assign({ id: (_, event) => "data" in event ? event.data : undefined }),

    stop: () => {

      if (
        MusicKit.PlaybackStates[MusicKit.getInstance().playbackState] ===
          "playing"
      ) {

        MusicKit.getInstance().stop();

      }

    },

    tick: assign({ seek: () => {

      const seek = MusicKit.getInstance().currentPlaybackTime;
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
// result = await MusicKit.getInstance().api.music("v1/me/library/search", {term:"Where Angel Fear To Tread", types: ["library-songs"]})

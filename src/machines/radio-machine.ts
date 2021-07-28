/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import {
  assign, Machine as machine
} from "xstate";
import { playerService } from "./jukebox-machine";
import client from "~/graphql/client";
import { RadioDocument } from "~/graphql/types";
import type { Radio } from "~/graphql/types";

export type Context = {
  id?: string;
  radio?: Radio;
};

export type Schema = {
  states: {
    idle: {};
    waiting: {};
    prepare: {};
    adjust: {};
    seeking: {};
  };
};

export type Event =
  | { type: "ADJUST" }
  | { type: "SEEKING" }
  | { type: "SET_ID"; id: string }
  | { type: "SET_RADIO"; radio: Radio };

export const Machine = machine<Context, Schema, Event>(
  {
    context: {},

    id: "radio",

    initial: "idle",

    states: {
      idle: { on: { SET_ID: {
        actions: ["setId"],
        target: "waiting"
      } } },

      // MusicKit 読み込み時間を考慮
      waiting: { after: { 1000: "prepare" } },

      prepare: {
        exit: ["pause"],
        invoke: { src: "listen" },
        on: {
          ADJUST: "adjust",
          SET_RADIO: { actions: "setRadio" }
        }
      },

      adjust: {
        invoke: { src: "adjustSeeking" },
        on: { SEEKING: "seeking" }
      },

      seeking: { after: { 0: {
        actions: "changeSeek",
        target: "idle"
      } } }
    }
  },
  {
    actions: {
      changeSeek: ({ radio }) => {

        if (radio) {

          playerService.send({
            seek: radio.durationMs,
            type: "CHANGE_SEEK"
          });

        }

      },
      pause: () => playerService.send("PAUSE"),
      setId: assign({ id: (_, event) => "id" in event ? event.id : undefined }),
      setRadio: assign({ radio: (_, event) => "radio" in event ? event.radio : undefined })
    },
    services: {
      // シークしても問題なく読み込みが可能か調整
      adjustSeeking:
        ({ radio }) => (send) => {

          if (!radio) {

            return send("SEEKING");

          }

          const currentTrack = radio.tracks[radio.trackNumber - 1];
          const id = currentTrack.appleMusicTracks?.find(
            (track) => track
          )?.appleMusicId;

          const isAppleMusic = Boolean(id);
          const adjustProgress = Math.floor(
            radio.durationMs / currentTrack.durationMs * 100
          );

          const intervalId = setInterval(() => {

            if (isAppleMusic) {

              if (
                MusicKit.getInstance().player.currentBufferedProgress >
                adjustProgress
              ) {

                send("SEEKING");

              }

            } else {

              send("SEEKING");

            }

          }, 500);

          return () => clearInterval(intervalId);

        },
      listen:
        ({ id }) => (send) => {

          if (!id) {

            return undefined;

          }

          (async () => {

            const result = await client.query({
              fetchPolicy: "no-cache",
              query: RadioDocument,
              variables: { id }
            });

            if (result.data.radio) {

              const radio = result.data.radio as Radio;

              send({
                radio,
                type: "SET_RADIO"
              });

              playerService.send([
                {
                  name: radio.name,
                  type: "SET_NAME"
                },
                {
                  link: location.pathname + location.search,
                  type: "SET_LINK"
                },
                {
                  currentPlaybackNo: radio.trackNumber - 1,
                  tracks: radio.tracks.map((track) => track),
                  type: "REPLACE_AND_PLAY"
                }
              ]);

              send("ADJUST");

            }

          })();

        }
    }
  }
);

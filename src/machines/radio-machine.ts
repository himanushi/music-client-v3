/* eslint-disable max-lines-per-function */
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import {
  assign, interpret, Machine as machine
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
    initialize: {};
    idle: {};
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

const machineId = "radio";

// JSON から復元
const getData = (name: keyof Context, context: Context) => {

  const json = localStorage.getItem(machineId);
  if (!json) {

    return context[name];

  }

  try {

    const data = JSON.parse(json)[name];
    if (data) {

      return data;

    }
    return context[name];

  } catch (error) {

    return context[name];

  }

};

export const Machine = machine<Context, Schema, Event>(
  {
    context: {},

    id: machineId,

    initial: "initialize",

    states: {
      initialize: {
        entry: "remember",
        after: { 0: "idle" }
      },

      idle: { on: { SET_ID: {
        actions: ["setId"],
        target: "prepare"
      } } },

      prepare: {
        entry: "memory",
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
      setId: assign({ id: (_, event) => "id" in event ? event.id : undefined }),
      setRadio: assign({ radio: (_, event) => "radio" in event ? event.radio : undefined }),
      memory: (context) => {

        const json = JSON.stringify(context);

        try {

          localStorage.setItem(machineId, json);

        } catch (error) {
          // unable to save to localStorage
        }

      },
      remember: assign({
        id: (context) => getData("id", context),
        radio: (context) => getData("radio", context)
      })
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

          const intervalId = setInterval(() => {

            if (isAppleMusic) {

              if (MusicKit.getInstance().isPlaying) {

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
                  isRadio: true,
                  type: "SET_IS_RADIO"
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

export const radioService = interpret(Machine).start();

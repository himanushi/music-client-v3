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
    active: {};
  };
};

export type Event =
  | { type: "ACTIVE" }
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
      waiting: { after: { 1000: "prepare" } },
      prepare: {
        exit: ["pause"],
        invoke: { src: "listen" },
        on: {
          ACTIVE: "active",
          SET_RADIO: { actions: ["setRadio"] }
        }
      },

      active: { after: { DELAY_SEEK: { actions: ["changeSeek"] } } }
    }
  },
  {
    actions: {
      changeSeek: ({ radio }) => {

        if (radio) {

          let delay = Math.floor(radio.durationMs / 15);
          if (delay < 5000) {

            delay = 5000;

          }

          playerService.send({
            seek: radio.durationMs + delay,
            type: "CHANGE_SEEK"
          });

        }

      },
      pause: () => playerService.send("PAUSE"),
      setId: assign({ id: (_, event) => "id" in event ? event.id : undefined }),
      setRadio: assign({ radio: (_, event) => "radio" in event ? event.radio : undefined })
    },
    delays: { DELAY_SEEK: ({ radio }) => {

      if (!radio) {

        return 0;

      }

      const id = radio.tracks[radio.trackNumber - 1].appleMusicTracks?.find(
        (track) => track
      )?.appleMusicId;

      // Apple Music
      if (id) {

        const delay = Math.floor(radio.durationMs / 15);
        if (delay > 5000) {

          return delay;

        }
        return 5000;

      }

      // Preview
      return 0;

    } },
    services: { listen:
        ({ id }) => (callback) => {

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

              callback({
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

              callback("ACTIVE");

            }

          })();

        } }
  }
);

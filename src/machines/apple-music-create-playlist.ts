// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import axios from "axios";
import {
  interpret, Machine as machine, assign
} from "xstate";
import type { Track } from "~/graphql/types";

export type Context = {
  name?: string;
  description?: string;
  tracks?: Track[];
};

export type Schema = {
  states: {
    active: {};
    creating: {};
    done: {};
    error: {};
  };
};

export type Event =
  | {
      type: "CREATE";
      name: string;
      description: string;
      tracks: Track[];
    }
  | { type: "ACTIVE" };

export const Machine = machine<Context, Schema, Event>(
  {
    id: "apple-music-playlist",

    initial: "active",

    context: {},

    on: { ACTIVE: "active" },

    states: {
      active: { on: { CREATE: {
        target: "creating",
        actions: ["setContext"]
      } } },
      creating: { invoke: {
        // eslint-disable-next-line max-lines-per-function
        src: ({
          name, description, tracks
        }) => {

          if (!name || !description || !tracks) {

            return () => {
              // nothing
            };

          }

          const url = "https://api.music.apple.com/v1/me/library/playlists";

          const headers = {
            Authorization: `Bearer ${MusicKit.getInstance().developerToken}`,
            "Music-User-Token": MusicKit.getInstance().musicUserToken
          };

          const data = tracks.
            map((track) => {

              const id = track.appleMusicTracks?.find(
                (apple) => apple
              )?.appleMusicId;

              if (id) {

                return {
                  id,
                  type: "songs"
                };

              }

              return undefined;

            }).
            filter((track) => track);

          const body = {
            attributes: {
              name,
              description
            },
            relationships: { tracks: { data } }
          };

          return axios.post(url, body, { headers });

        },

        onDone: "done",

        onError: "error"
      } },
      done: { after: { 0: [{ target: "active" }] } },
      error: { after: { 0: [{ target: "active" }] } }
    }
  },
  {
    actions: { setContext: assign({
      name: (_, event) => "name" in event ? event.name : undefined,
      description: (_, event) => "description" in event ? event.description : undefined,
      tracks: (_, event) => "tracks" in event ? event.tracks : undefined
    }) },
    services: {}
  }
);

export const service = interpret(Machine).start();

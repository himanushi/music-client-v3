// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import SpotifyWebApi from "spotify-web-api-node";
import {
  interpret, Machine as machine, assign
} from "xstate";
import type { Track } from "~/graphql/types";
import { cookie } from "~/lib/cookie";
import { spotifyAccessToken } from "~/machines/spotify-account-machine";

export type Context = {
  name?: string;
  description?: string;
  tracks?: Track[];
  spotifyPlaylistId?: string;
};

export type Schema = {
  states: {
    active: {};
    creating: {};
    adding: {};
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
        src: ({
          name, description
        }) => {

          const accessToken = cookie.get(spotifyAccessToken);

          if (!accessToken || !name || !description) {

            return () => {
              // nothing
            };

          }

          const spotifyApi = new SpotifyWebApi({ accessToken });

          return spotifyApi.createPlaylist(name, { description });

        },

        onDone: {
          target: "adding",
          actions: assign({ spotifyPlaylistId: (_, event) => event.data.body.id })
        },

        onError: "error"
      } },

      adding: { invoke: {
        src: ({
          tracks, spotifyPlaylistId
        }) => {

          const accessToken = cookie.get(spotifyAccessToken);

          if (!accessToken || !spotifyPlaylistId || !tracks) {

            return () => {
              // nothing
            };

          }

          const spotifyApi = new SpotifyWebApi({ accessToken });

          const trackIds = tracks.
            map((track) => {

              const id = track.spotifyTracks?.find((trak) => trak)?.spotifyId;
              return `spotify:track:${id}`;

            }).
            filter((track) => track);

          return spotifyApi.addTracksToPlaylist(spotifyPlaylistId, trackIds);

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

// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import { ObservableQuery } from "@apollo/client";
import type { WatchQueryFetchPolicy } from "@apollo/client";
import {
  Machine as machine, assign, Interpreter
} from "xstate";
import { Mutable } from "~/@types/extends";
import client from "~/graphql/client";
import { AlbumsDocument } from "~/graphql/types";
import type { AlbumsQuery } from "~/graphql/types";
import type {
  Album, AlbumsQueryVariables
} from "~/graphql/types";
import buildParameters from "~/lib/build-parameters";

export type albumsContext = {
  albums: Album[];
  variables: AlbumsQueryVariables;
  watchQuery?: ObservableQuery<AlbumsQuery, AlbumsQueryVariables>;
  fetchPolicy: WatchQueryFetchPolicy;
};

export type albumsSchema = {
  states: {
    active: {};
    loading: {};
    fetching: {};
  };
};

export type albumsEvent =
  | {
      type: "SET_PARAMETERS";
      params: { [x: string]: any };
    }
  | {
      type: "SET_VARIABLES";
      variables: AlbumsQueryVariables;
    }
  | {
      type: "SET_WATCH_QUERY";
      watchQuery: ObservableQuery<AlbumsQuery, AlbumsQueryVariables>;
    }
  | {
      type: "SET_ALBUMS";
      albums: Album[];
    }
  | {
      type: "ADD_ALBUMS";
      albums: Album[];
    }
  | { type: "ACTIVE" }
  | { type: "EXECUTE_QUERY" }
  | { type: "FETCH_MORE" };

const id = "albums";
const limit = 50;

export const albumsMachine = machine<albumsContext, albumsSchema, albumsEvent>(
  {
    id,

    initial: "active",

    context: {
      albums: [],
      variables: {
        cursor: {
          limit,
          offset: 0
        },
        conditions: {},
        sort: {}
      },
      fetchPolicy: "cache-first"
    },

    states: {
      active: { on: {
        SET_PARAMETERS: { actions: [
          "setParameters",
          "setFetchPolicy"
        ] },

        SET_VARIABLES: { actions: [
          "setVariables",
          "setFetchPolicy"
        ] },

        EXECUTE_QUERY: "loading",

        FETCH_MORE: "fetching"
      } },

      loading: {
        invoke: { src: ({
          variables, fetchPolicy
        }) => (callback) => {

          const watchQuery = client.watchQuery({
            query: AlbumsDocument,
            variables,
            fetchPolicy
          });

          callback({
            type: "SET_WATCH_QUERY",
            watchQuery
          });

          const subscribe = watchQuery.subscribe((data) => {

            callback({
              type: "SET_ALBUMS",
              albums: data.data.albums
            });

            callback("ACTIVE");

          });

          return () => subscribe.unsubscribe();

        } },

        on: {
          SET_WATCH_QUERY: { actions: "setWatchQuery" },
          SET_ALBUMS: { actions: "setAlbums" },
          ACTIVE: "active"
        }
      },

      fetching: {
        invoke: { src: ({
          watchQuery, albums
        }) => (callback) => {

          if (watchQuery) {

            (async () => {

              const result = await watchQuery.fetchMore({ variables: { cursor: {
                limit,
                offset: albums.length
              } } });

              callback({
                type: "ADD_ALBUMS",
                albums: result.data.albums
              });

              callback("ACTIVE");

            })();

          }

        } },

        on: {
          ADD_ALBUMS: { actions: "addAlbums" },
          ACTIVE: "active"
        }
      }
    }
  },
  { actions: {
    next: assign({ variables: ({
      variables, albums
    }) => ({
      ...variables,
      cursor: {
        limit,
        offset: albums.length
      }
    }) }),

    setAlbums: assign({ albums: ({ albums }, event) => "albums" in event ? event.albums : albums }),

    addAlbums: assign({ albums: ({ albums }, event) => "albums" in event ? [
      ...albums,
      ...event.albums
    ] : albums }),

    setWatchQuery: assign({ watchQuery: (_, event) => "watchQuery" in event ? event.watchQuery : undefined }),

    setFetchPolicy: assign({ fetchPolicy: ({ variables }) => variables.conditions?.favorite ? "no-cache" : "cache-first" }),

    setParameters: assign({ variables: ({ variables }, event) => {

      if ("params" in event) {

        return buildParameters<Mutable<AlbumsQueryVariables>>(
          "album",
          event.params,
          variables
        );

      }

      return variables;

    } }),

    setVariables: assign({ variables: ({ variables }, event) => {

      if ("variables" in event) {

        return {
          ...variables,
          ...event.variables
        };

      }

      return variables;

    } })
  } }
);

export type albumsServiceType = Interpreter<
  albumsContext,
  albumsSchema,
  albumsEvent,
  {
    value: any;
    context: albumsContext;
  }
>;

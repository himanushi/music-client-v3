// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import { ObservableQuery } from "@apollo/client";
import type {
  DocumentNode, WatchQueryFetchPolicy
} from "@apollo/client";
import {
  Machine as machine, assign
} from "xstate";
import { Mutable } from "~/@types/extends";
import client from "~/graphql/client";
import type {
  Maybe, CursorInputObject
} from "~/graphql/types";
import buildParameters from "~/lib/build-parameters";
import type { ParameterPrefix } from "~/lib/build-parameters";

export type ItemsQueryVariables = {
  cursor?: Maybe<CursorInputObject>;
  sort?: { order?: string; type?: string };
  conditions?: { favorite?: number };
};

const limit = 50;

// eslint-disable-next-line max-lines-per-function
export const itemsMachine = <
  ItemType extends any,
  ItemsQuery extends { items: ReadonlyArray<Record<string, any>> }
>(
    type: ParameterPrefix,
    itemsDocument: DocumentNode
  ) => {

  interface itemsContext extends Record<string, any> {
    items: ItemType[];
    variables?: ItemsQueryVariables;
    watchQuery?: ObservableQuery<ItemsQuery, ItemsQueryVariables>;
    fetchPolicy: WatchQueryFetchPolicy;
  }

  type itemsSchema = {
    states: {
      active: {};
      loading: {};
      moreFetching: {};
    };
  };

  type itemsEvent =
    | {
        type: "SET_PARAMETERS";
        params: { [x: string]: any };
      }
    | {
        type: "SET_VARIABLES";
        variables: ItemsQueryVariables;
      }
    | {
        type: "SET_WATCH_QUERY";
        watchQuery: ObservableQuery<ItemsQuery, ItemsQueryVariables>;
      }
    | {
        type: "SET_ITEMS";
        items: ItemType[];
      }
    | {
        type: "ADD_ITEMS";
        items: ItemType[];
      }
    | { type: "ACTIVE" }
    | { type: "EXECUTE_QUERY" }
    | { type: "FETCH_MORE" };

  const id = "items";

  return machine<itemsContext, itemsSchema, itemsEvent>(
    {
      id,

      initial: "active",

      context: {
        variables: {
          cursor: {
            limit,
            offset: 0
          },
          conditions: {},
          sort: {}
        },
        items: [],
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

          FETCH_MORE: "moreFetching"
        } },

        loading: {
          invoke: { src: ({
            variables, fetchPolicy
          }) => (callback) => {

            const watchQuery = client.watchQuery({
              query: itemsDocument,
              variables,
              fetchPolicy
            });

            callback({
              type: "SET_WATCH_QUERY",
              watchQuery
            });

            const subscribe = watchQuery.subscribe((data) => {

              callback({
                type: "SET_ITEMS",
                items: data.data.items
              });

              callback("ACTIVE");

            });

            return () => subscribe.unsubscribe();

          } },

          on: {
            SET_WATCH_QUERY: { actions: "setWatchQuery" },
            SET_ITEMS: { actions: "setItems" },
            ACTIVE: "active"
          }
        },

        moreFetching: {
          invoke: { src: ({
            variables, watchQuery, items
          }) => (callback) => {

            if (watchQuery) {

              (async () => {

                const result = await watchQuery.fetchMore({ variables: { cursor: {
                  limit: variables?.cursor?.limit || limit,
                  offset: items.length
                } } });

                callback({
                  type: "ADD_ITEMS",
                  items: result.data.items
                });

                callback("ACTIVE");

              })();

            }

          } },

          on: {
            ADD_ITEMS: { actions: "addItems" },
            ACTIVE: "active"
          }
        }
      }
    },
    { actions: {
      next: assign({ variables: ({
        variables, items
      }) => {

        if (variables) {

          return {
            ...variables,
            cursor: {
              limit,
              offset: items.length
            }
          };

        }

        return variables;

      } }),

      setItems: assign({ items: ({ items }, event) => "items" in event ? event.items : items }),

      addItems: assign({ items: ({ items }, event) => "items" in event ? [
        ...items,
        ...event.items
      ] : items }),

      setWatchQuery: assign({ watchQuery: (_, event) => "watchQuery" in event ? event.watchQuery : undefined }),

      setFetchPolicy: assign({ fetchPolicy: ({ variables }) => variables?.conditions?.favorite ? "no-cache" : "cache-first" }),

      setParameters: assign({ variables: ({ variables }, event) => {

        if ("params" in event) {

          return buildParameters<Mutable<ItemsQueryVariables>>(
            type,
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

};

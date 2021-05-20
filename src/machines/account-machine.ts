// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import {
  interpret, Machine as machine, assign, Sender
} from "xstate";
import client from "~/graphql/client";
import {
  MeDocument, LogoutDocument, LoginDocument
} from "~/graphql/types";
import type { CurrentUser } from "~/graphql/types";

export type accountContext = {
  me?: CurrentUser;
  username?: string;
  password?: string;
};

export type accountSchema = {
  states: {
    idle: {};
    authorized: {
      states: {
        idle: {};
        loading: {};
      };
    };
    unauthorized: {
      states: {
        idle: {};
        loading: {};
      };
    };
  };
};

export type accountEvent =
  | { type: "LOGIN_OR_LOGOUT" }
  | { type: "LOGIN"; username?: string; password?: string }
  | { type: "LOGOUT" }
  | { type: "AUTHORIZED" }
  | { type: "UNAUTHORIZED" }
  | { type: "IDLE" }
  | { type: "LOADING"; username?: string; password?: string }
  | { type: "SET_ME"; me: CurrentUser }
  | { type: "SET_LOGIN_INFO"; username?: string; password?: string };

const accountId = "account";

export const accountMachine = machine<
  accountContext,
  accountSchema,
  accountEvent
>(
  {
    id: accountId,

    initial: "idle",

    context: {},

    states: {
      idle: {
        meta: { label: "loading" },

        on: {
          SET_ME: { actions: ["setMe"] },
          AUTHORIZED: "authorized",
          UNAUTHORIZED: "unauthorized"
        },

        invoke: { src: "initializing" }
      },

      authorized: {
        meta: { label: "ログアウト" },

        initial: "idle",

        states: {
          idle: { on: { LOGOUT: "loading" } },

          loading: {
            on: { IDLE: `#${accountId}.idle` },

            invoke: { src: () => (callback) => {

              (async () => {

                const result = await client.mutate({
                  mutation: LogoutDocument,
                  variables: { input: {} }
                });

                if (result.data?.logout?.error === null) {

                  callback("IDLE");

                }

              })();

            } }
          }
        }
      },

      unauthorized: {
        meta: { label: "ログイン" },

        initial: "idle",

        states: {
          idle: { on: {
            SET_LOGIN_INFO: { actions: ["setLoginInfo"] },
            LOGIN: "loading"
          } },

          loading: {
            on: { AUTHORIZED: `#${accountId}.authorized` },

            invoke: { src: ({
              username, password
            }) => (callback) => {

              if (!username || !password) {

                return;

              }

              (async () => {

                const result = await client.mutate({
                  mutation: LoginDocument,
                  variables: { input: {
                    username,
                    password
                  } }
                });

                if (result.data?.login?.error === null) {

                  callback({
                    type: "SET_LOGIN_INFO",
                    username: undefined,
                    password: undefined
                  });
                  callback("AUTHORIZED");

                }

              })();

            } }
          }
        }
      }
    }
  },
  {
    actions: {
      setMe: assign({ me: (_, event) => "me" in event ? event.me : undefined }),

      setLoginInfo: assign({
        username: (_, event) => "username" in event ? event.username : undefined,
        password: (_, event) => "password" in event ? event.password : undefined
      })
    },

    services: { initializing: () => (callback: Sender<accountEvent>) => {

      (async () => {

        const meQuery = await client.query({ query: MeDocument });
        const { me } = meQuery.data;

        callback({
          type: "SET_ME",
          me
        });

        if (me.registered) {

          callback({ type: "AUTHORIZED" });

        } else {

          callback({ type: "UNAUTHORIZED" });

        }

      })();

    } }
  }
);

export const accountService = interpret(accountMachine, { devTools: true }).start();

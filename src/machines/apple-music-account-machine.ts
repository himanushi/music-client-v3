// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import { assign } from "xstate";
import {
  interpret, Machine as machine, Sender
} from "xstate";

export type accountContext = {
  config?: MusicKit.Config;
};

export type accountSchema = {
  states: {
    idle: {};
    checking: {};
    authorized: {};
    unauthorized: {};
  };
};

export type accountEvent =
  | { type: "SET_TOKEN"; config: MusicKit.Config }
  | { type: "LOGIN_OR_LOGOUT" }
  | { type: "LOGIN" }
  | { type: "LOGOUT" };

export const accountMachine = machine<
  accountContext,
  accountSchema,
  accountEvent
>(
  {
    id: "apple-music-account",

    initial: "idle",

    context: { config: undefined },

    states: {
      idle: { on: { SET_TOKEN: {
        actions: "setConfig",
        target: "checking"
      } } },

      checking: {
        invoke: { src:
            ({ config }) => (callback) => {

              if (config) {

                (async () => {

                  await MusicKit.configure(config);
                  MusicKit.getInstance().storefrontId = "jp";

                  if (MusicKit.getInstance().isAuthorized) {

                    callback({ type: "LOGIN" });

                  } else {

                    callback({ type: "LOGOUT" });

                  }

                })();

              } else {

                callback({ type: "LOGOUT" });

              }

            } },
        on: {
          LOGIN: "authorized",
          LOGOUT: "unauthorized"
        },

        meta: { label: "loading" }
      },

      authorized: {
        invoke: {
          id: "unauthorize",

          src: () => (callback: Sender<accountEvent>) => {

            const changeStatus = (result: { authorizationStatus: number }) => {

              if (result.authorizationStatus === 0) {

                callback("LOGOUT");

              }

            };

            MusicKit.getInstance().addEventListener(
              MusicKit.Events.authorizationStatusDidChange,
              changeStatus
            );

            return () => MusicKit.getInstance().removeEventListener(
              MusicKit.Events.authorizationStatusDidChange,
              changeStatus
            );

          }
        },

        on: {
          LOGIN_OR_LOGOUT: { actions: "logout" },
          LOGOUT: "unauthorized"
        },

        meta: { label: "ログアウト" }
      },

      unauthorized: {
        invoke: {
          id: "unauthorize",

          src: () => (callback: Sender<accountEvent>) => {

            const changeStatus = (result: { authorizationStatus: number }) => {

              if (result.authorizationStatus !== 0) {

                callback("LOGIN");

              }

            };

            MusicKit.getInstance().addEventListener(
              MusicKit.Events.authorizationStatusDidChange,
              changeStatus
            );

            return () => MusicKit.getInstance().removeEventListener(
              MusicKit.Events.authorizationStatusDidChange,
              changeStatus
            );

          }
        },

        on: {
          LOGIN_OR_LOGOUT: { actions: "login" },
          LOGIN: "authorized"
        },

        meta: { label: "ログイン" }
      }
    }
  },
  { actions: {
    login: () => MusicKit.getInstance().authorize(),

    logout: () => MusicKit.getInstance().unauthorize(),

    setConfig: assign({ config: (_, event) => "config" in event ? event.config : undefined })
  } }
);

export const accountService = interpret(accountMachine).start();

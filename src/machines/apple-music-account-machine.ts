// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import { assign } from "xstate";
import {
  interpret, Machine as machine, send, Sender
} from "xstate";

export type accountContext = {
  config?: MusicKit.Config;
};

export type accountSchema = {
  states: {
    idle: {};
    authorized: {};
    unauthorized: {};
  };
};

export type accountEvent =
  | { type: "SET_TOKEN"; config: MusicKit.Config }
  | { type: "LOGIN_OR_LOGOUT" }
  | { type: "LOGIN" }
  | { type: "LOGOUT" }
  | { type: "RENEW" };

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
      idle: {
        on: {
          SET_TOKEN: { actions: [
            "setConfig",
            "setToken"
          ] },
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
          LOGOUT: "unauthorized",
          RENEW: { actions: "renew" }
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

    renew: ({ config }) => {

      if (config) {

        MusicKit.configure(config);
        MusicKit.getInstance().api.storefrontId = "jp";

      }

    },

    setConfig: assign({ config: (_, event) => "config" in event ? event.config : undefined }),

    setToken: send((_, event) => {

      try {

        MusicKit.getInstance();

      } catch (error) {

        if ("config" in event) {

          MusicKit.configure(event.config);
          MusicKit.getInstance().api.storefrontId = "jp";

        }

      }

      if (MusicKit.getInstance().isAuthorized) {

        return { type: "LOGIN" };

      }

      return { type: "LOGOUT" };

    })
  } }
);

export const accountService = interpret(accountMachine).start();

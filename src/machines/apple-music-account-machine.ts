/* eslint-disable no-undef */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable sort-keys */

import {
  interpret, Machine as machine, send
} from "xstate";

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
  | { type: "LOGOUT" };

export const accountMachine = machine<{}, accountSchema, accountEvent>(
  {
    id: "appleMusicAccount",

    initial: "idle",

    states: {
      idle: {
        on: {
          SET_TOKEN: { actions: ["setToken"] },
          LOGIN: "authorized",
          LOGOUT: "unauthorized"
        },

        meta: { label: "idle" }
      },

      authorized: {
        invoke: {
          id: "unauthorize",

          src: (_, _event) => (callback) => {

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

          src: (_, _event) => (callback) => {

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

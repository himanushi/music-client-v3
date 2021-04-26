// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import { v4 as uuid } from "uuid";
import {
  assign, interpret, Machine as machine
} from "xstate";
import { cookie } from "~/lib/cookie";

const spotifyState = "spotifyState";
const spotifyAccessToken = "spotifyAccessToken";
const spotifyRefreshToken = "spotifyRefreshTokenDummy";

export type accountContext = {
  login: (code?: string) => void;
  logout: () => void;
};

export type accountSchema = {
  states: {
    idle: {};
    waiting: {};
    authorized: {
      states: {
        idle: {};
        logout: {};
      };
    };
    unauthorized: {};
  };
};

export type accountEvent =
  | {
      type: "SET_FUNCTION";
      login: accountContext["login"];
      logout: accountContext["logout"];
    }
  | { type: "LOGIN_OR_LOGOUT" }
  | { type: "WAITING" }
  | { type: "AUTHORIZED" }
  | { type: "UNAUTHORIZED" }
  | { type: "LOGIN" }
  | { type: "LOGOUT" };

const spotifyAccountId = "spotify-account";

export const accountMachine = machine<
  accountContext,
  accountSchema,
  accountEvent
>(
  {
    id: spotifyAccountId,

    initial: "idle",

    context: {
      login: () => {

        // eslint-disable-next-line no-console
        console.warn("初期化されていない!!");

      },
      logout: () => {

        // eslint-disable-next-line no-console
        console.warn("初期化されていない!!");

      }
    },

    states: {
      idle: {
        on: { SET_FUNCTION: {
          actions: ["setFunction"],
          target: "waiting"
        } },

        meta: { label: "initializing" }
      },

      waiting: {
        invoke: { src: () => (callback) => {

          const accessToken = cookie.get(spotifyAccessToken);
          const refreshTokenToken = cookie.get(spotifyRefreshToken);

          if (accessToken || refreshTokenToken) {

            callback("AUTHORIZED");

          }

          callback("UNAUTHORIZED");

        } },

        on: {
          AUTHORIZED: "authorized",
          UNAUTHORIZED: "unauthorized"
        },

        meta: { label: "loading" }
      },

      authorized: {
        initial: "idle",

        states: {
          idle: {
            on: { LOGIN_OR_LOGOUT: "logout" },

            meta: { label: "ログアウト" }
          },
          logout: {
            invoke: { src: ({ logout }) => (callback) => {

              (async () => {

                await logout();
                callback("WAITING");

              })();

            } },

            on: { WAITING: `#${spotifyAccountId}.waiting` },

            meta: { label: "ログアウト中..." }
          }
        }
      },

      unauthorized: {
        invoke: {
          id: "after-redirecting-from-spotify",

          src: (context) => (callback) => {

            const url = new URL(window.location.href);
            const params = url.searchParams;

            const code = params.get("code");
            const state = params.get("state");

            if (code && state) {

              if (cookie.get(spotifyState) !== state) {

                cookie.remove(spotifyState);
                return;

              }

              cookie.remove(spotifyState);

              (async () => {

                await context.login(code);

                callback("WAITING");

              })();

            }

          }
        },

        on: {
          LOGIN_OR_LOGOUT: { actions: "login" },
          WAITING: "waiting"
        },

        meta: { label: "ログイン" }
      }
    }
  },
  { actions: {
    login: () => {

      const id = uuid();
      cookie.set(spotifyState, id, { expires: 1 / 24 });

      const clientId =
          import.meta.env.SNOWPACK_PUBLIC_SPOTIFY_CLIENT_ID || "";
      const redirectUri =
          import.meta.env.SNOWPACK_PUBLIC_SPOTIFY_REDIRECT_URI || "";

      const scopes = [
        "streaming",
        "user-read-email",
        "user-read-private"
      ].join(" ");

      const url =
          "https://accounts.spotify.com/authorize" +
          "?response_type=code" +
          `&client_id=${clientId}` +
          `&scope=${encodeURIComponent(scopes)}` +
          `&redirect_uri=${encodeURIComponent(redirectUri)}` +
          `&state=${id}`;

      window.open(url, "_self");

    },

    logout: ({ logout }) => {

      cookie.remove(spotifyAccessToken);
      cookie.remove(spotifyRefreshToken);
      logout();

    },

    setFunction: assign({
      login: (_, event: accountEvent) => {

        if ("login" in event) {

          return event.login;

        }

        // eslint-disable-next-line no-shadow
        return (_) => {

          // eslint-disable-next-line no-console
          console.warn("setFunction でバグがある");

        };

      },

      logout: (_, event: accountEvent) => {

        if ("logout" in event) {

          return event.logout;

        }

        // eslint-disable-next-line no-shadow
        return () => {

          // eslint-disable-next-line no-console
          console.warn("setFunction でバグがある");

        };

      }
    })
  } }
);

export const accountService = interpret(accountMachine).start();

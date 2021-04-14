/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable sort-keys */

import { interpret, Machine as machine, send } from "xstate";

export type accountSchema = {
  states: {
    authorized: {};
    unauthorized: {};
  };
};

export type accountEvent =
  | { type: "LOGIN_OR_LOGOUT" }
  | { type: "LOGIN" }
  | { type: "LOGOUT" };

export const accountMachine = machine<{}, accountSchema, accountEvent>(
  {
    "id": "appleMusicAccount",

    "initial": "unauthorized",

    "states": {
      "authorized": {
        "on": {
          "LOGIN_OR_LOGOUT": { "actions": "logout" },
          "LOGOUT": "unauthorized"
        },
        "meta": {
          "buttonLabel": "ログアウト"
        }
      },

      "unauthorized": {
        "on": {
          "LOGIN_OR_LOGOUT": { "actions": "login" },
          "LOGIN": "authorized"
        },
        "meta": {
          "buttonLabel": "ログイン"
        }
      }
    }
  },
  {
    "actions": {
      "login": send("LOGIN"),
      "logout": send("LOGOUT")
    }
  }
);

export const accountService = interpret(accountMachine).start();

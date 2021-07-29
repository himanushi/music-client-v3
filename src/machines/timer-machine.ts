import {
  assign, interpret
} from "xstate";
import { Machine as machine } from "xstate";

export type Context = {
  now: Date;
  hours: string;
  minutes: string;
  seconds: string;
};

export type Schema = {
  states: {
    active: {};
  };
};

export type Event = { type: "SET_TICK" };

const padding = (num: number) => `0${num}`.slice(-2);

export const Machine = machine<Context, Schema, Event>(
  {
    context: {
      hours: "00",
      minutes: "00",
      now: new Date(),
      seconds: "00"
    },

    id: "timer",

    initial: "active",

    states: { active: {
      invoke: { src: "tick" },
      on: { SET_TICK: { actions: [
        "setNow",
        "setHours",
        "setMinutes",
        "setSeconds"
      ] } }
    } }
  },
  {
    actions: {
      setHours: assign({ hours: ({ now }) => now ? padding(now.getHours()) : "00" }),
      setMinutes: assign({ minutes: ({ now }) => now ? padding(now.getMinutes()) : "00" }),
      setNow: assign<Context, Event>({ now: () => new Date() }),
      setSeconds: assign({ seconds: ({ now }) => now ? padding(now.getSeconds()) : "00" })
    },
    services: { tick: () => (callback) => {

      const interval = setInterval(() => callback("SET_TICK"), 1000);
      return () => clearInterval(interval);

    } }
  }
);

export const timerService = interpret(Machine).start();

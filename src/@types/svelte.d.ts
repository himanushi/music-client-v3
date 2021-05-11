/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

// ref: https://github.com/isaacHagoel/svelte-dnd-action#typescript
declare type DndEvent = import("svelte-dnd-action").DndEvent;
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onconsider?: (
      event: CustomEvent<DndEvent> & { target: EventTarget & T }
    ) => void;
    onfinalize?: (
      event: CustomEvent<DndEvent> & { target: EventTarget & T }
    ) => void;
    onmoving?: () => void;
    onremove?: (
      event: CustomEvent & {
        detail: { index: number };
      }
    ) => void;
    ondecide?: (
      event: CustomEvent & {
        detail: { from: number; to: number };
      }
    ) => void;
  }
}

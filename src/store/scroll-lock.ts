import { writable } from "svelte/store";

type scrollLockType = {
  [key: string]: number;
};

const createScrollLock = () => {

  const {
    subscribe, update
  } = writable<scrollLockType>({});

  return {
    subscribe,
    update: (path: string, scrollTop: number) => {

      update((object) => {

        object[path] = scrollTop;

        return object;

      });

    }
  };

};

export const scrollLock = createScrollLock();

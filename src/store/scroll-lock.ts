import {writable} from "svelte/store";

type scrollLockType = {
  [key: string]: number;
};

export const scrollLock = writable<scrollLockType>({});

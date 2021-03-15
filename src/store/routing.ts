import {writable} from "svelte/store";

// { "albums" : 100 }
type scrollPathType = {
  [key: string]: number;
};

export const scrollPath = writable<scrollPathType>({});

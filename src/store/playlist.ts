import { writable } from "svelte/store";

// 曲が追加されるプレイリスト
type defaultPlaylistIdType = {
  id: string;
  name: string;
};

export const defaultPlaylistId = writable<null | defaultPlaylistIdType>(null);

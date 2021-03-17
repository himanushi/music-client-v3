// 表示に関係のある store
import { writable } from "svelte/store";

export const sidebarHidden = writable<boolean>(true);

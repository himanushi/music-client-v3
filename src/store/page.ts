// 表示に関係のある store
import { SvelteComponent } from "svelte";
import { writable } from "svelte/store";

export const sidebarHidden = writable<boolean>(true);

export const modal = writable<null | typeof SvelteComponent>(null);

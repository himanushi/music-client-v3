<script context="module">
// 連続再生するとバグので、Webアプリ全体で連続再生できないようにしておく
import { writable } from "svelte/store";

const createCanPlay = () => {

  const {
    subscribe, update
  } = writable<boolean>(true);

  return {
    play: () => {

      update(() => false);
      setTimeout(() => update(() => true), 1000);

    },
    subscribe,
    update
  };

};

export const canPlay = createCanPlay();
</script>

<script lang="ts">
import IconButton from "./icon-button.svelte";
import type { Track } from "~/graphql/types";
import Play from "~/icons/play.svelte";
import { playerService } from "~/machines/jukebox-machine";

export let name: string;
export let index: number;
export let tracks: readonly Track[];

const onClick = () => {

  canPlay.play();

  playerService.send([
    {
      name,
      type: "SET_NAME"
    },
    {
      link: location.pathname + location.search,
      type: "SET_LINK"
    },
    {
      isRadio: false,
      type: "SET_IS_RADIO"
    },
    {
      currentPlaybackNo: index,
      tracks: tracks.map((track) => track),
      type: "REPLACE_AND_PLAY"
    }
  ]);

};
</script>

<IconButton disabled={!$canPlay} class="w-10 h-10" on:click={onClick}>
  <Play class="w-10 h-10 text-white" />
</IconButton>

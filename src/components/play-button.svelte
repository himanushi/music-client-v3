<script lang="ts">
import IconButton from "./icon-button.svelte";
import type { Track } from "~/graphql/types";
import Play from "~/icons/play.svelte";
import { playerService } from "~/machines/jukebox-machine";

export let name: string;
export let index: number;
export let tracks: readonly Track[];

const onClick = () => {

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
      currentPlaybackNo: index,
      tracks: tracks.map((track) => track),
      type: "REPLACE_AND_PLAY"
    }
  ]);

};
</script>

<IconButton class="w-10 h-10" on:click={onClick}>
  <Play class="w-10 h-10 text-white" />
</IconButton>

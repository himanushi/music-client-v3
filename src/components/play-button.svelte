<script lang="ts">
import type { Track } from "~/graphql/types";
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
      currentPlaybackNo: index,
      tracks: tracks.map((track) => track),
      type: "REPLACE_AND_PLAY"
    }
  ]);

};
</script>

<button on:click={onClick}>|></button>

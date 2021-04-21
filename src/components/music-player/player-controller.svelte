<script lang="ts">
import IconButton from "~/components/icon-button.svelte";
import PuaseIcon from "~/icons/pause.svelte";
import PlayIcon from "~/icons/play.svelte";
import LoadingIcon from "~/icons/refresh.svelte";
import RewindIcon from "~/icons/rewind.svelte";
import SkipIcon from "~/icons/skip.svelte";
import { playerService } from "~/machines/jukebox-machine";

$: player = $playerService.context.musicPlayerRef;

const play_or_pause = () => {

  playerService.send("PLAY_OR_PAUSE");

};

const rewind = () => {

  playerService.send("PREVIOUS_PLAY");

};

const skip = () => {

  playerService.send("NEXT_PLAY");

};
</script>

<IconButton on:click={rewind}>
  <RewindIcon color="text-gray-900" />
</IconButton>

{#if player}
  <IconButton on:click={play_or_pause}>
    {#if $player.value === "playing"}
      <PuaseIcon color="text-gray-900" />
    {:else if $player.value === "loading"}
      <LoadingIcon color="text-gray-900" />
    {:else}
      <PlayIcon color="text-gray-900" />
    {/if}
  </IconButton>
{/if}

<IconButton on:click={skip}>
  <SkipIcon color="text-gray-900" />
</IconButton>

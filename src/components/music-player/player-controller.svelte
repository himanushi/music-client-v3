<script lang="ts">
import { goto } from "@roxi/routify";
import AddPlaylistButton from "../add-playlist-button.svelte";
import Favorite from "../favorite.svelte";
import { modals } from "../modals.svelte";
import RepeatButton from "./repeat-button.svelte";
import IconButton from "~/components/icon-button.svelte";
import Link from "~/icons/link.svelte";
import LoadingIcon from "~/icons/loading.svelte";
import PuaseIcon from "~/icons/pause.svelte";
import PlayIcon from "~/icons/play.svelte";
import RewindIcon from "~/icons/rewind.svelte";
import SkipIcon from "~/icons/skip.svelte";
import { playerService } from "~/machines/jukebox-machine";

$: player = $playerService.context.musicPlayerRef;

$: disabled =
  player &&
  ($player.value === "loading" || $player.value === "playerSelecting");

const playOrPause = () => {

  playerService.send("PLAY_OR_PAUSE");

};

const rewind = () => {

  playerService.send("PREVIOUS_PLAY");

};

const skip = () => {

  playerService.send("NEXT_PLAY");

};

const link = () => {

  if (player && $player.context.track?.id) {

    const { id } = $player.context.track;
    modals.close();
    $goto("/tracks/:id", { id });

  }

};
</script>

<div>
  <div>
    <IconButton {disabled} class="h-16 w-16" on:click={rewind}>
      <RewindIcon class="text-white h-16 w-16" />
    </IconButton>

    {#if player}
      <IconButton {disabled} class="h-16 w-16" on:click={playOrPause}>
        {#if $player.value === "playing"}
          <PuaseIcon class="text-white h-16 w-16" />
        {:else if $player.value === "loading"}
          <LoadingIcon />
        {:else}
          <PlayIcon class="text-white h-16 w-16" />
        {/if}
      </IconButton>
    {/if}

    <IconButton {disabled} class="h-16 w-16" on:click={skip}>
      <SkipIcon class="text-white h-16 w-16" />
    </IconButton>
  </div>

  <div>
    <RepeatButton class="h-11 w-11" />

    {#if player && $player.context.track}
      <Favorite type="track" id={$player.context.track.id} />
      <AddPlaylistButton class="h-11 w-11" tracks={[$player.context.track]} />
    {/if}

    <IconButton class="h-11 w-11" on:click={link}>
      <Link class="h-11 w-11 text-white" />
    </IconButton>
  </div>
</div>

<style lang="scss">
div {
  @apply flex flex-col items-center justify-center;

  div {
    @apply grid grid-flow-col gap-2;
  }
}
</style>

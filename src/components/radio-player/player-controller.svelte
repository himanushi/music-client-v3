<script lang="ts">
import { goto } from "@roxi/routify";
import AddPlaylistButton from "../add-playlist-button.svelte";
import Favorite from "../favorite.svelte";
import { modals } from "../modals.svelte";
import IconButton from "~/components/icon-button.svelte";
import Link from "~/icons/link.svelte";
import Live from "~/icons/live.svelte";
import LoadingIcon from "~/icons/loading.svelte";
import Stop from "~/icons/stop.svelte";
import { playerService } from "~/machines/jukebox-machine";
import { radioService } from "~/machines/radio-machine";

$: player = $playerService.context.musicPlayerRef;

$: disabled = player && $player.value === "loading";

const stop = () => {

  playerService.send("PAUSE");

};

const live = () => {

  if ($radioService.context.id) {

    radioService.send({
      id: $radioService.context.id,
      type: "SET_ID"
    });

  }

};

const trackLink = () => {

  if (player && $player.context.track?.id) {

    const { id } = $player.context.track;
    modals.close();
    $goto("/tracks/:id", { id });

  }

};
</script>

<div>
  <div>
    {#if player}
      {#if $player.value === "playing"}
        <IconButton {disabled} class="h-16 w-16" on:click={stop}>
          <Stop class="text-white h-12 w-12" />
        </IconButton>
      {:else if $player.value === "loading"}
        <IconButton class="h-16 w-16">
          <LoadingIcon />
        </IconButton>
      {:else}
        <IconButton {disabled} class="h-16 w-16" on:click={live}>
          <Live class="text-red-500 h-12 w-12 mb-2" />
        </IconButton>
      {/if}
    {/if}
  </div>

  <div>
    {#if player && $player.context.track}
      <Favorite type="track" id={$player.context.track.id} />
      <AddPlaylistButton class="h-11 w-11" tracks={[$player.context.track]} />
    {/if}

    <IconButton class="h-11 w-11" on:click={trackLink}>
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

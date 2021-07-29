<script lang="ts">
import { fly } from "svelte/transition";
import IconButton from "./icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import Player from "~/components/music-player/index.svelte";
import Queue from "~/components/queue/index.svelte";
import Radio from "~/components/radio-player/index.svelte";
import Close from "~/icons/close.svelte";
import Live from "~/icons/live.svelte";
import MusicNote from "~/icons/music-note.svelte";
import Playlist from "~/icons/playlist.svelte";
import { playerService } from "~/machines/jukebox-machine";

const close = () => modals.close();
let tabIndex = 0;
const tabs = [
  Player,
  Queue,
  Radio
];

$: musicClass = tabIndex === 0 ? "text-teal-400" : "text-white";
$: playlistClass = tabIndex === 1 ? "text-teal-400" : "text-white";
$: if ($playerService.context.isRadio) {

  tabIndex = 2;

}
</script>

<div
  on:click|stopPropagation
  transition:fly={{
    duration: 400,
    opacity: 100,
    y: document.documentElement.clientHeight
  }}
  class="player"
>
  <div class="content">
    <svelte:component this={tabs[tabIndex]} />
  </div>
  <div class="buttons">
    {#if tabIndex === 2}
      <IconButton class="h-12 w-12">
        <Live class="h-10 w-10 text-teal-400" />
      </IconButton>
    {:else}
      <IconButton class="h-12 w-12" on:click={() => tabIndex = 0}>
        <MusicNote class={`h-10 w-10 ${musicClass}`} />
      </IconButton>

      <IconButton class="h-12 w-12" on:click={() => tabIndex = 1}>
        <Playlist class={`h-10 w-10 ${playlistClass}`} />
      </IconButton>
    {/if}

    <IconButton class="h-12 w-12" on:click={close}>
      <Close class="h-10 w-10 text-white" />
    </IconButton>
  </div>
</div>

<style lang="scss">
.player {
  @apply absolute inset-0 m-auto overflow-hidden;
  @apply bg-gray-800 rounded;
  @apply h-[600px] w-[300px];

  .buttons {
    @apply absolute bottom-5 w-full grid grid-flow-col justify-items-center;
  }
}
</style>

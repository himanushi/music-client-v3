<script>
import { fly } from "svelte/transition";
import { modal } from "~/components/modal.svelte";
import Player from "~/components/music-player/index.svelte";
import Queue from "~/components/queue/index.svelte";

const close = () => modal.set(null);
let tabIndex = 0;
const tabs = [
  Player,
  Queue
];
</script>

<div
  on:click|stopPropagation
  transition:fly={{
    "duration": 400,
    "opacity": 100,
    "y": document.body.clientHeight
  }}
  class="player"
>
  <svelte:component this={tabs[tabIndex]} />
  <button on:click={close} class="close">x</button>
  <button on:click={() => tabIndex = 0}>player</button>
  <button on:click={() => tabIndex = 1}>queue</button>
</div>

<style lang="scss">
.player {
  @apply h-full w-full bg-gray-500;
}
</style>

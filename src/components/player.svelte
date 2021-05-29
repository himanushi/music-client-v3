<script>
import { fly } from "svelte/transition";
import { modals } from "~/components/modals.svelte";
import Player from "~/components/music-player/index.svelte";
import Queue from "~/components/queue/index.svelte";

const close = () => modals.close();
let tabIndex = 0;
const tabs = [
  Player,
  Queue
];
</script>

<div
  on:click|stopPropagation
  transition:fly={{
    duration: 400,
    opacity: 100,
    y: document.body.clientHeight
  }}
  class="player"
>
  <div>
    <svelte:component this={tabs[tabIndex]} />
  </div>
  <button on:click={close} class="close">x</button>
  <button on:click={() => tabIndex = 0}>player</button>
  <button on:click={() => tabIndex = 1}>queue</button>
</div>

<style lang="scss">
.player {
  /* 位置 */
  @apply absolute inset-0 m-auto overflow-hidden;
  /* 形 */
  @apply bg-gray-800 rounded;
  /* 大きさ */
  @apply h-[600px] w-[300px];
}
</style>

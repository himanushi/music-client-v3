<script lang="ts">
  import { setContext } from "svelte";
  import ScrollLock from "./_scroll-lock.svelte";

  let content: HTMLElement;

  setContext("content", {
    "getElement": () => content
  });
</script>

<main data-routify="scroll-lock" bind:this={content}>
  <ScrollLock />
  <slot>contetnt</slot>
</main>

<style>
  main {
    @apply h-full overflow-auto;
  }
</style>

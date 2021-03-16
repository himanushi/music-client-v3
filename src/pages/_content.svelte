<script lang="ts">
  import { setContext } from "svelte";
  import ScrollLock from "./_scroll-lock.svelte";

  let content: HTMLElement;

  setContext("content", {
    "getElement": () => content
  });

  // 一瞬だけスクロールの一番上が表示されるのを回避する
  let invisible = true;
</script>

<main data-routify="scroll-lock" bind:this={content} class:invisible>
  <ScrollLock
    on:pageChange={() => invisible = true}
    on:pageLoad={() => invisible = false}
  />
  <slot>contetnt</slot>
</main>

<style>
  main {
    @apply h-full overflow-auto;
  }
</style>

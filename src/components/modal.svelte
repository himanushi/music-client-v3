<script context="module" lang="ts">
  import { SvelteComponent } from "svelte";
  import { writable } from "svelte/store";

  export const modal = writable<null | typeof SvelteComponent>(null);
</script>

<script lang="ts">
  const close = () => modal.set(null);
</script>

{#if $modal}
  <div on:click={close}>
    <svelte:component this={$modal} />
  </div>
{/if}

<style lang="scss">
  div {
    @apply absolute w-full h-full z-50;
    @apply bg-black bg-opacity-30;
  }
</style>

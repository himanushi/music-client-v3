<script lang="ts">
  import { modal } from "~/store/page";
</script>

{#if $modal}
  <div>
    <svelte:component this={$modal} />
  </div>
{/if}

<style lang="scss">
  div {
    @apply absolute w-full h-full z-50;
    @apply bg-black bg-opacity-30;
  }
</style>

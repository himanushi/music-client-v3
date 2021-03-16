<script lang="ts">
  import ScrollLock from "./_scroll-lock.svelte";
</script>

<main data-routify="scroll-lock">
  <ScrollLock />
  <slot>contetnt</slot>
</main>

<style>
  main {
    @apply h-full overflow-auto;
  }
</style>

<script lang="ts">
import { setContext } from "svelte";
import ChangePage from "./_change-page.svelte";

let content: HTMLElement;

setContext("content", { getElement: () => content });
</script>

<main data-routify="scroll-lock" bind:this={content}>
  <ChangePage />
  <div class="content">
    <slot />
  </div>
</main>

<style lang="scss">
main {
  @apply h-full overflow-auto;

  .content {
    @apply lg_mx-20 xl_mx-36 2xl_mx-60;
  }
}
</style>

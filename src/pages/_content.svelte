<script lang="ts">
import { setContext } from "svelte";
import ChangePage from "./_change-page.svelte";

let content: HTMLElement;

setContext("content", { getElement: () => content });

// 一瞬だけスクロールの一番上が表示されるのを回避する
let invisible = true;
</script>

<main data-routify="scroll-lock" bind:this={content} class:invisible>
  <ChangePage
    on:pageChange={() => invisible = true}
    on:pageLoad={() => invisible = false}
  />
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

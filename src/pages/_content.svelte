<script>
import ChangePage from "./_change-page.svelte";
</script>

<main data-routify="scroll-lock">
  <ChangePage />
  <div class="content">
    <slot />
  </div>
</main>

<style lang="scss">
main {
  @apply h-full overflow-auto;
  @apply py-16;

  .content {
    @apply lg_mx-20 xl_mx-36 2xl_mx-60;
  }
}
</style>

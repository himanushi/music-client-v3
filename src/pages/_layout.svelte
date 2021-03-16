<script lang="ts">
  import { setClient } from "svelte-apollo";
  import Content from "./_content.svelte";
  import Footer from "./_footer.svelte";
  import Header from "./_header.svelte";
  import client from "~/graphql/client";

  setClient(client);
</script>

<Header />
<Content><slot /></Content>
<Footer />

<style lang="scss">
  :global(body) {
    /* 子要素の位置 */
    @apply flex flex-col inset-0 absolute;
    /* スクロールバー無効 */
    @apply overflow-hidden;

    :global(header) {
      /* サイズ固定 */
      @apply relative flex-shrink-0;
      /* 表示順 */
      @apply order-first;
    }

    :global(main) {
      /* サイズ可変 */
      @apply relative flex-1 h-0;
      /* 表示順 */
      @apply order-1;
    }

    :global(footer) {
      /* サイズ固定 */
      @apply relative flex-shrink-0;
      /* 表示順 */
      @apply order-last;
    }
  }
</style>

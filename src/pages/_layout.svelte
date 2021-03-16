<script lang="ts">
  import { setClient } from "svelte-apollo";
  import Content from "./_content.svelte";
  import Footer from "./_footer.svelte";
  import Header from "./_header.svelte";
  import client from "~/graphql/client";

  setClient(client);
</script>

<div class="page">
  <div class="header">
    <Header />
  </div>

  <div class="content">
    <Content>
      <slot><!-- content --></slot>
    </Content>
  </div>

  <div class="footer">
    <Footer />
  </div>
</div>

<style>
  .page {
    /* 子要素の位置 */
    @apply flex flex-col inset-0 absolute;
    /* スクロールバー無効 */
    @apply overflow-hidden;
  }

  .header {
    /* サイズ固定 */
    @apply relative flex-shrink-0;
    @apply order-first;
  }

  .content {
    /* サイズ可変 */
    @apply relative flex-1 h-0;
    @apply order-1;
  }

  .footer {
    /* サイズ固定 */
    @apply relative flex-shrink-0;
    @apply order-last;
  }
</style>

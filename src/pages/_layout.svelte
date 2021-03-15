<script lang="ts">
  import {setClient} from "svelte-apollo";

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

  .header,
  .footer {
    /* サイズ固定 */
    @apply flex-shrink-0;
  }

  .content {
    @apply flex-grow;
    /* スクロールバー有効 */
    @apply overflow-y-scroll;
  }
</style>

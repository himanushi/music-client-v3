<script lang="ts">
  import {setClient} from "svelte-apollo";
  import Content from "~/components/content.svelte";
  import Footer from "~/components/footer.svelte";
  import Header from "~/components/header.svelte";
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
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    position: absolute;
    flex-direction: column;
    /* justify-content: space-between; */
    /* contain: layout size style; */
    overflow: hidden;
  }

  .header {
    display: block;
    position: relative;
  }

  .content {
    contain: size;
    flex-basis: 0%;
    flex-grow: 1;
    flex-shrink: 1;
    height: 100%;
    @apply overflow-y-auto;
  }

  .footer {
    display: block;
    position: relative;
  }
</style>

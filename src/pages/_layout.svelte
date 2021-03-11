<script lang="ts">
  import Content from "~/components/content.svelte";
  import Footer from "~/components/footer.svelte";
  import Header from "~/components/header.svelte";
</script>

<Content>
  <Header />
  <slot><!-- content --></slot>
  <Footer />
</Content>

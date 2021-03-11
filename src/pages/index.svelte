<script lang="ts">
  import {url} from "@roxi/routify";
  import Content from "~/components/content.svelte";
  import Footer from "~/components/footer.svelte";
  import Header from "~/components/header.svelte";
</script>

<a
  class="text-blue-700 visited:text-purple-800 underline"
  href={$url("./albums")}>Albums</a
>
<Content>
  <Header />
  <Content />
  <Footer />
</Content>

<script lang="ts">
  import {setClient} from "svelte-apollo";
  import Content from "~/components/content.svelte";
  import Footer from "~/components/footer.svelte";
  import Header from "~/components/header.svelte";
  import client from "~/graphql/client";

  setClient(client);
</script>

<Content>
  <Header />
  <slot><!-- content --></slot>
  <Footer />
</Content>

<script lang="ts">
  import client from "./graphql/client";
  import { setClient } from "svelte-apollo";
  import Albums from "./albums.svelte";

  setClient(client)
</script>

<Albums />

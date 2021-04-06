<script lang="ts">
  import { params } from "@roxi/routify";
  import Albums from "./_albums.svelte";
  import type { conditonsType } from "./_albums.svelte";
  import SearchBar from "./_search-bar.svelte";
  import { SearchParams } from "~/lib/params";

  const conditions: conditonsType = {};
  $: conditions.name = $params[SearchParams.album.keyword];
</script>

<SearchBar />

<div class="albums">
  <Albums {conditions} />
</div>

<style>
  .albums {
    @apply flex flex-wrap;
  }
</style>

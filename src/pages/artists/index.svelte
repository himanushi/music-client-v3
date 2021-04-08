<script lang="ts">
import { params } from "@roxi/routify";
import type { conditonsType } from "./_artists.svelte";
import Artists from "./_artists.svelte";
import SearchBar from "./_search-bar.svelte";
import { SearchParams } from "~/lib/params";

const conditions: conditonsType = {};
$: conditions.name = $params[SearchParams.artist.keyword];
</script>

<SearchBar />

<div class="artists">
  <Artists {conditions} />
</div>

<style>
.artists {
  @apply flex flex-wrap;
}
</style>

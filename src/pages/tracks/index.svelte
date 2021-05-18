<script lang="ts">
import { params } from "@roxi/routify";
import SearchBar from "./_search-bar.svelte";
import SearchDetailButton from "./_search-detail-button.svelte";
import Tracks from "./_tracks.svelte";
</script>

<SearchBar />
<SearchDetailButton />

<div>
  <Tracks params={$params} />
</div>

<style>
div {
  @apply flex flex-wrap;
}
</style>

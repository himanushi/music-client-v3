<script lang="ts">
import { params } from "@roxi/routify";
import Playlists from "./_playlists.svelte";
import SearchBar from "./_search-bar.svelte";
import SearchDetailButton from "./_search-detail-button.svelte";
</script>

<SearchBar />
<SearchDetailButton />

<div>
  <Playlists params={$params} />
</div>

<style>
div {
  @apply flex flex-wrap;
}
</style>

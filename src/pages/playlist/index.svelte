<script lang="ts">
import { params } from "@roxi/routify";
import Playlists from "./_playlists.svelte";
import SearchDetailButton from "./_search-detail-button.svelte";
</script>

<SearchDetailButton />

<div>
  <Playlists params={$params} />
</div>

<style>
div {
  @apply flex flex-wrap;
}
</style>

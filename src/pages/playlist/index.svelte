<script lang="ts">
import { params } from "@roxi/routify";
import Playlist from "./_playlists.svelte";
import type { conditonsType } from "./_playlists.svelte";
import SearchBar from "./_search-bar.svelte";
import { SearchParams } from "~/lib/params";

const conditions: conditonsType = {};
$: conditions.name = $params[SearchParams.playlist.keyword];
</script>

<SearchBar />

<div class="playlist">
  <Playlist {conditions} />
</div>

<style>
.playlist {
  @apply flex flex-wrap;
}
</style>

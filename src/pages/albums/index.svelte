<script lang="ts">
import { params } from "@roxi/routify";
import Albums from "./_albums.svelte";
import SearchBar from "./_search-bar.svelte";
import SearchDetailButton from "./_search-detail-button.svelte";
</script>

<SearchBar />
<SearchDetailButton />

<div class="albums">
  <Albums params={$params} />
</div>

<style>
.albums {
  @apply flex flex-wrap;
}
</style>

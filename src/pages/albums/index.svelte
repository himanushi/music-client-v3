<script lang="ts">
import { params } from "@roxi/routify";
import Albums from "./_albums.svelte";
import SearchDetailButton from "./_search-detail-button.svelte";
</script>

<SearchDetailButton />

<div>
  <Albums params={$params} />
</div>

<style>
div {
  @apply flex flex-wrap;
}
</style>

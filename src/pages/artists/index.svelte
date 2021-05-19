<script lang="ts">
import { params } from "@roxi/routify";
import Artists from "./_artists.svelte";
import SearchDetailButton from "./_search-detail-button.svelte";
</script>

<SearchDetailButton />

<div>
  <Artists params={$params} />
</div>

<style>
div {
  @apply flex flex-wrap;
}
</style>

<script lang="ts">
import { params } from "@roxi/routify";
import SearchDetailButton from "./_search-detail-button.svelte";
import Tracks from "./_tracks.svelte";
</script>

<SearchDetailButton />

<div>
  <Tracks params={$params} />
</div>

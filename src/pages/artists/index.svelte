<script lang="ts">
import { params } from "@roxi/routify";
import Artists from "./_artists.svelte";
import SearchDetailButton from "./_search-detail-button.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "artists")}
  <SearchDetailButton />

  <div>
    <Artists params={$params} />
  </div>
{/if}

<style>
div {
  @apply flex flex-wrap;
}
</style>

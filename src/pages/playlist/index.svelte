<script lang="ts">
import { params } from "@roxi/routify";
import NewButton from "./_new-button.svelte";
import Playlists from "./_playlists.svelte";
import SearchDetailButton from "./_search-detail-button.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "playlists")}
  <SearchDetailButton />

  <NewButton />

  <div>
    <Playlists params={$params} />
  </div>
{/if}

<style>
div {
  @apply flex flex-wrap;
}
</style>

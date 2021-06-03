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
  <div>
    <Playlists params={$params} />
  </div>
  <SearchDetailButton />
  <NewButton />
{/if}

<style lang="scss">
div {
  @apply mt-2 mb-20 mx-4 divide-y divide-gray-700;
}
</style>

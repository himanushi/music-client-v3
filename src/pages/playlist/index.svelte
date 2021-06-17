<script lang="ts">
import { params } from "@roxi/routify";
import NewButton from "./_new-button.svelte";
import Playlists from "./_playlists.svelte";
import SearchDetail from "./_search-detail.svelte";
import SyncButton from "./_sync-button.svelte";
import SearchDetailButton from "~/components/search-detail-button.svelte";
import client from "~/graphql/client";
import {
  isAllowed, meQuery
} from "~/lib/me";

$: tggle = true;
const render = () => {

  client.cache.evict({
    fieldName: "playlists",
    id: "ROOT_QUERY"
  });

  tggle = !tggle;

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "playlists")}
  {#key tggle}
    <div>
      <Playlists params={$params} />
    </div>
  {/key}
  <SearchDetailButton component={SearchDetail} />
  <NewButton />
  <SyncButton onClick={render} />
{/if}

<style lang="scss">
div {
  @apply mt-2 mb-20 mx-4 divide-y divide-gray-700;
}
</style>

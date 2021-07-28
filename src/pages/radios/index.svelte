<script lang="ts">
import { params } from "@roxi/routify";
import Radios from "./_radios.svelte";
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
    fieldName: "radios",
    id: "ROOT_QUERY"
  });

  tggle = !tggle;

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "radios")}
  {#key tggle}
    <div>
      <Radios params={$params} />
    </div>
  {/key}
  <SearchDetailButton component={SearchDetail} />
  <SyncButton onClick={render} />
{/if}

<style lang="scss">
div {
  @apply mt-2 mb-20 mx-4 divide-y divide-gray-700;
}
</style>

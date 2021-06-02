<script lang="ts">
import { params } from "@roxi/routify";
import SearchDetailButton from "./_search-detail-button.svelte";
import Tracks from "./_tracks.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import { SearchParams } from "~/lib/params";

$: canSearch = false;

$: if (params) {

  canSearch = $params[SearchParams.track.favorite] === "1";

  const keyword = $params[SearchParams.track.keyword];
  if (keyword && keyword.length >= 2) {

    canSearch = true;

  }

}

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "tracks")}
  {#if canSearch}
    <div>
      <Tracks params={$params} />
    </div>
  {/if}
  <SearchDetailButton />
{/if}

<style lang="scss">
div {
  @apply my-2 mx-4 divide-y divide-gray-700;
}
</style>

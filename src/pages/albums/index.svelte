<script lang="ts">
import { params } from "@roxi/routify";
import Albums from "./_albums.svelte";
import SearchDetailButton from "./_search-detail-button.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "albums")}
  <SearchDetailButton />

  <div>
    <Albums params={$params} />
  </div>
{/if}

<style>
div {
  @apply flex flex-wrap;
}
</style>

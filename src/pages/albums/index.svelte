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
  <div>
    <Albums params={$params} />
  </div>
  <SearchDetailButton />
{/if}

<style>
div {
  grid-template-columns: repeat(auto-fill, 175px);

  @apply my-2 w-full;
  @apply grid gap-1 justify-center justify-items-center items-center;
}
</style>

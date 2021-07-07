<script lang="ts">
import Random from "./_random.svelte";
import SyncButton from "./_sync-button.svelte";
import client from "~/graphql/client";
import {
  isAllowed, meQuery
} from "~/lib/me";

$: tggle = true;
const render = () => {

  client.cache.evict({
    fieldName: "tracks",
    id: "ROOT_QUERY"
  });

  tggle = !tggle;

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "tracks")}
  {#key tggle}
    <Random />
  {/key}
  <SyncButton onClick={render} />
{/if}

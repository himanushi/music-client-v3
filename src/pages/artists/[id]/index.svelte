<script lang="ts">
import Artist from "./_artist.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id = "";

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "artist")}
  <Artist {id} />
{/if}

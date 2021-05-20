<script lang="ts">
import Playlist from "./_playlist.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id = "";

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "playlist")}
  <Playlist {id} />
{/if}

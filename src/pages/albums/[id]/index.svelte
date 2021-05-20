<script lang="ts">
import Album from "./_album.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id = "";

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "album")}
  <Album {id} />
{/if}

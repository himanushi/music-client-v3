<script lang="ts">
import Track from "./_track.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id = "";

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "track")}
  <Track {id} />
{/if}

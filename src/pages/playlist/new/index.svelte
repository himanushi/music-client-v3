<script lang="ts">
import New from "./_new.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "upsertPlaylist")}
  <New />
{/if}

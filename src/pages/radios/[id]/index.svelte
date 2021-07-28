<script lang="ts">
import Radio from "./_radio.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id = "";

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "radio")}
  <Radio {id} />
{/if}

<script lang="ts">
import Edit from "./_edit.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

const mq = meQuery();
$: me = $mq?.data?.me;
</script>

{#if me && me.registered && isAllowed(me, "updateMe")}
  <Edit name={me.name} />
{/if}

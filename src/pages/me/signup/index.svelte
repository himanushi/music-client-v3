<script lang="ts">
import Signup from "./_signup.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

const mq = meQuery();
$: me = $mq?.data?.me;
</script>

{#if me && !me.registered && isAllowed(me, "signup")}
  <Signup />
{/if}

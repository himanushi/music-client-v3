<script lang="ts">
import {
  isAllowed, meQuery
} from "~/lib/me";
import { mergeMeta } from "~/lib/merge-meta";
import { accountService as account } from "~/machines/apple-music-account-machine";

const onClick = () => account.send("LOGIN_OR_LOGOUT");

$: meta = mergeMeta<{ label: string }>($account.meta);

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "appleMusicToken")}
  <button on:click={onClick}>Apple Music {meta.label}</button>
{/if}

<style lang="scss">
button {
  @apply rounded p-2;
  @apply bg-red-500 hover_bg-red-400 active_bg-red-300 text-black;
}
</style>

<script lang="ts">
import {
  isAllowed, meQuery
} from "~/lib/me";
import { mergeMeta } from "~/lib/merge-meta";
import { accountService as account } from "~/machines/spotify-account-machine";

const onClick = () => account.send("LOGIN_OR_LOGOUT");

$: meta = mergeMeta<{ label: string }>($account.meta);

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, [
"spotifyLogin",
"spotifyLogout"
])}
  <button on:click={onClick}>Spotify {meta.label}</button>
{/if}

<style lang="scss">
button {
  @apply rounded p-2;
  @apply bg-green-500 hover_bg-green-400 active_bg-green-300 text-black;
}
</style>

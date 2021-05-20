<script lang="ts">
import Text from "~/components/text.svelte";
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
  <Text>Spotify</Text>
  <button on:click={onClick}>{meta.label}</button>
{/if}

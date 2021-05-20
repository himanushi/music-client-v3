<script lang="ts">
import Text from "~/components/text.svelte";
import { mergeMeta } from "~/lib/merge-meta";
import { accountService as account } from "~/machines/spotify-account-machine";

const onClick = () => account.send("LOGIN_OR_LOGOUT");

$: meta = mergeMeta<{ label: string }>($account.meta);
</script>

<Text>Spotify</Text>
<button on:click={onClick}>{meta.label}</button>

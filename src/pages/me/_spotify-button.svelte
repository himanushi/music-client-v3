<script lang="ts">
import Text from "~/components/text.svelte";
import { accountService } from "~/machines/spotify-account-machine";

const onClick = () => {

  accountService.send("LOGIN_OR_LOGOUT");

};

$: meta = $accountService.meta[`${accountService.id}.${$accountService.value}`];
</script>

<Text>Spotify</Text>
<button on:click={onClick}>{meta.label}</button>

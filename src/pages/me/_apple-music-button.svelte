<script lang="ts">
import Text from "~/components/text.svelte";
import { accountService } from "~/machines/apple-music-account-machine";

const onClick = () => {

  accountService.send("LOGIN_OR_LOGOUT");

};

$: meta = $accountService.meta[`appleMusicAccount.${$accountService.value}`];
</script>

<Text>Apple Music</Text>
<button on:click={onClick}>{meta.buttonLabel}</button>

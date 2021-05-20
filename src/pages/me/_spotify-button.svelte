<script lang="ts">
import Text from "~/components/text.svelte";
import { accountService } from "~/machines/spotify-account-machine";

const onClick = () => accountService.send("LOGIN_OR_LOGOUT");

let meta: any;

$: {

  meta = $accountService.meta as any;
  meta = meta[Object.keys(meta)[0]];

}
</script>

<Text>Spotify</Text>
<button on:click={onClick}>{meta.label}</button>

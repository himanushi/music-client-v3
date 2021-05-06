<script>
import IconButton from "~/components/icon-button.svelte";
import RefreshIcon from "~/icons/refresh.svelte";
import { playerService } from "~/machines/jukebox-machine";

$: enable = $playerService.context.repeat ? "" : "opacity-50";

const repeat = () => {

  playerService.send("REPEAT");

};
</script>

<IconButton on:click={repeat}>
  <RefreshIcon color={`text-gray-900 ${enable}`} />
</IconButton>

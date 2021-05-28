<script>
import IconButton from "~/components/icon-button.svelte";
import RepeatIcon from "~/icons/repeat.svelte";
import { playerService } from "~/machines/jukebox-machine";

$: enable = $playerService.context.repeat ? "" : "opacity-50";

const repeat = () => {

  playerService.send("REPEAT");

};
</script>

<IconButton on:click={repeat}>
  <RepeatIcon class={`text-gray-900 ${enable}`} />
</IconButton>

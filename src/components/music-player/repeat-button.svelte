<script>
import IconButton from "~/components/icon-button.svelte";
import RepeatIcon from "~/icons/repeat.svelte";
import { playerService } from "~/machines/jukebox-machine";

let className = "h-10 w-10";
export { className as class };

$: enable = $playerService.context.repeat ? "" : "opacity-30";

const repeat = () => {

  playerService.send("REPEAT");

};
</script>

<IconButton class={className} on:click={repeat}>
  <RepeatIcon class={` text-white ${className} ${enable}`} />
</IconButton>

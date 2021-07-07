<script lang="ts">
import IconButton from "~/components/icon-button.svelte";
import Sync from "~/icons/sync.svelte";
import { playerService } from "~/machines/jukebox-machine";

export let onClick: () => void;

let top = "80px";

$: if ($playerService.context.currentTrack) {

  top = "130px";

}

let disabled = false;

const click = () => {

  disabled = true;
  setTimeout(() => disabled = false, 5000);
  onClick();

};
</script>

<span style={`--tp:${top};`}>
  <IconButton {disabled} on:click={click} class="w-10 h-10">
    <Sync class="w-10 h-10" />
  </IconButton>
</span>

<style lang="scss">
span {
  @apply fixed right-5 calc-top;
  @apply flex items-center justify-center;
  @apply h-10 w-10 rounded-full bg-white;
  @apply shadow;
}
</style>

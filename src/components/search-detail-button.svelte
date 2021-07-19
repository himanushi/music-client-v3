<script lang="ts">
import { SvelteComponent } from "svelte";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import Search from "~/icons/search.svelte";
import { playerService } from "~/machines/jukebox-machine";

export let component: typeof SvelteComponent;

const showModal = () => modals.open(component);

let className = "bottom-4";

$: if ($playerService.context.currentTrack) {

  className = "bottom-20";

}
</script>

<span class={className} on:click={showModal}>
  <IconButton class="w-10 h-10 mr-2">
    <Search class="w-10 h-10" />
  </IconButton>
</span>

<style lang="scss">
span {
  @apply fixed right-5;
  @apply flex items-center justify-center;
  @apply h-14 w-14 rounded-full bg-white;
  @apply shadow;
}
</style>

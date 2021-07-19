<script lang="ts">
import IconButton from "~/components/icon-button.svelte";
import Sync from "~/icons/sync.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import { playerService } from "~/machines/jukebox-machine";

export let onClick: () => void;

let className = "bottom-4";

$: if ($playerService.context.currentTrack) {

  className = "bottom-20";

}

let disabled = false;

const click = () => {

  disabled = true;
  setTimeout(() => disabled = false, 5000);
  onClick();

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "upsertPlaylist")}
  <span class={className}>
    <IconButton {disabled} on:click={click} class="w-8 h-8">
      <Sync class="w-8 h-8" />
    </IconButton>
  </span>
{/if}

<style lang="scss">
span {
  @apply fixed right-40;
  @apply flex items-center justify-center;
  @apply h-10 w-10 rounded-full bg-white;
  @apply shadow;
}
</style>

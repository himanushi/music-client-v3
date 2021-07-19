<script lang="ts">
import { goto } from "@roxi/routify";
import IconButton from "~/components/icon-button.svelte";
import Plus from "~/icons/plus.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import { playerService } from "~/machines/jukebox-machine";

const create = () => $goto("/playlist/new");

let className = "bottom-4";

$: if ($playerService.context.currentTrack) {

  className = "bottom-20";

}

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "upsertPlaylist")}
  <span class={className} on:click={create}>
    <IconButton class="w-8 h-8">
      <Plus class="w-8 h-8" />
    </IconButton>
  </span>
{/if}

<style lang="scss">
span {
  @apply fixed right-24;
  @apply flex items-center justify-center;
  @apply h-10 w-10 rounded-full bg-white;
  @apply shadow;
}
</style>

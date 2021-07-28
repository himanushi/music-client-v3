<script lang="ts">
import { goto } from "@roxi/routify";
import IconButton from "~/components/icon-button.svelte";
import Live from "~/icons/live.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import { playerService } from "~/machines/jukebox-machine";

export let id: string;

const createRadio = () => $goto("/playlist/:id/create-radio", { id });

let className = "bottom-4";

$: if ($playerService.context.currentTrack) {

  className = "bottom-20";

}

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "radio")}
  <span class={className} on:click={createRadio}>
    <IconButton class="w-6 h-6">
      <Live class="w-6 h-6 text-red-500" />
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

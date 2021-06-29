<script lang="ts">
import { goto } from "@roxi/routify";
import IconButton from "~/components/icon-button.svelte";
import Pen from "~/icons/pen.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import { playerService } from "~/machines/jukebox-machine";

export let id: string;

const edit = () => $goto("/playlist/:id/edit", { id });

let top = "80px";

$: if ($playerService.context.currentTrack) {

  top = "130px";

}

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "upsertPlaylist")}
  <span style={`--tp:${top};`} on:click={edit}>
    <IconButton class="w-8 h-8">
      <Pen class="w-8 h-8" />
    </IconButton>
  </span>
{/if}

<style lang="scss">
span {
  @apply fixed right-5 calc-top;
  @apply flex items-center justify-center;
  @apply h-14 w-14 rounded-full bg-white;
  @apply shadow;
}
</style>

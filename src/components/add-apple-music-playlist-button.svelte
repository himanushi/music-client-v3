<script lang="ts">
import type { Track } from "~/graphql/types";
import { accountService } from "~/machines/apple-music-account-machine";
import { service } from "~/machines/apple-music-create-playlist";

export let name: string;
export let description: string;
export let tracks: Track[];

const addPlaylist = () => {

  service.send({
    description,
    name,
    tracks,
    type: "CREATE"
  });

};

$: if ($service.matches("done")) {
  // toasts.open<Props>({
  //   component: AddedMusicServicePlaylistMessage,
  //   props: { name: "Apple Music" },
  //   type: "info"
  // });
} else if ($service.matches("error")) {
  // toasts.open({
  //   component: ErrorMessage,
  //   type: "error"
  // });
}
</script>

{#if accountService && $accountService.matches("authorized")}
  <button on:click={addPlaylist}> Apple Music に追加 </button>
{/if}

<style lang="scss">
button {
  @apply rounded p-2;
  @apply bg-red-500 hover_bg-red-400 active_bg-red-300;
}
</style>

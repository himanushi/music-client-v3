<script lang="ts">
import type { Props } from "~/components/toast-messages/added-music-service-playlist-message.svelte";
import AddedMusicServicePlaylistMessage from "~/components/toast-messages/added-music-service-playlist-message.svelte";
import ErrorMessage from "~/components/toast-messages/error-message.svelte";
import { toasts } from "~/components/toasts.svelte";
import type { Track } from "~/graphql/types";
import { accountService } from "~/machines/spotify-account-machine";
import { service } from "~/machines/spotify-create-playlist";

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

  toasts.open<Props>({
    component: AddedMusicServicePlaylistMessage,
    props: { name: "Spotify" },
    type: "info"
  });

} else if ($service.matches("error")) {

  toasts.open({
    component: ErrorMessage,
    type: "error"
  });

}
</script>

{#if accountService && $accountService.matches("authorized")}
  <button on:click={addPlaylist}>Spotify に追加</button>
{/if}

<style lang="scss">
button {
  @apply rounded p-2;
  @apply bg-green-500 hover_bg-green-400 active_bg-green-300;
}
</style>

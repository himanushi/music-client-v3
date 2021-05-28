<script lang="ts">
import IconButton from "~/components/icon-button.svelte";
import type { Props } from "~/components/toast-messages/added-music-service-playlist-message.svelte";
import AddedMusicServicePlaylistMessage from "~/components/toast-messages/added-music-service-playlist-message.svelte";
import ErrorMessage from "~/components/toast-messages/error-message.svelte";
import { toasts } from "~/components/toasts.svelte";
import type { Track } from "~/graphql/types";
import AddPlaylistIcon from "~/icons/add-playlist.svelte";
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

  toasts.open<Props>({
    component: AddedMusicServicePlaylistMessage,
    props: { name: "Apple Music" },
    type: "info"
  });

} else if ($service.matches("error")) {

  toasts.open({
    component: ErrorMessage,
    type: "error"
  });

}
</script>

Apple Music に追加
<IconButton on:click={addPlaylist}>
  <AddPlaylistIcon class="h-10 w-10" />
</IconButton>

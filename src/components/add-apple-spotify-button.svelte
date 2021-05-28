<script lang="ts">
import IconButton from "~/components/icon-button.svelte";
import type { Props } from "~/components/toast-messages/added-music-service-playlist-message.svelte";
import AddedMusicServicePlaylistMessage from "~/components/toast-messages/added-music-service-playlist-message.svelte";
import ErrorMessage from "~/components/toast-messages/error-message.svelte";
import { toasts } from "~/components/toasts.svelte";
import type { Track } from "~/graphql/types";
import AddPlaylistIcon from "~/icons/add-playlist.svelte";
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

Spotify に追加
<IconButton on:click={addPlaylist}>
  <AddPlaylistIcon class="w-10 h-10" />
</IconButton>

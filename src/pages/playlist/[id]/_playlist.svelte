<script lang="ts">
import { goto } from "@roxi/routify";
import { query } from "svelte-apollo";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Favorite from "~/components/favorite.svelte";
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import { PlaylistDocument } from "~/graphql/types";
import type {
  Playlist, PlaylistQuery
} from "~/graphql/types";
import ItemCard from "~/pages/tracks/_item-card.svelte";

export let id = "";

$: playlistQuery = query<PlaylistQuery>(PlaylistDocument, {
  fetchPolicy: "no-cache",
  variables: { id }
});

let playlist: Playlist | undefined;
let isMyPlaylist = false;

$: if ($playlistQuery.data) {

  playlist = $playlistQuery.data.playlist as Playlist;
  isMyPlaylist = playlist?.isMine || false;

}

const edit = () => {

  $goto("/playlist/:id/edit", { id });

};
</script>

{#if playlist}
  <Favorite type="playlist" id={playlist.id} />
  <AddPlaylistButton tracks={playlist.items.map((item) => item.track)} />
  <Image src={playlist.track?.artworkL?.url} class="h-16 w-16" />
  <Text>{playlist.name}</Text>
  <Text>{playlist.description}</Text>

  {#if isMyPlaylist}
    <button on:click={edit}>編集</button>
  {/if}

  {#each playlist.items as item, index (`${item.id}_${index}`)}
    <ItemCard
      name={playlist.name}
      item={item.track}
      items={playlist.items.map((it) => it.track)}
      {index}
    />
  {/each}
{/if}

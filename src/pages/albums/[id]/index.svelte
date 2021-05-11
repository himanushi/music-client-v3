<script lang="ts">
import { query } from "svelte-apollo";
import PlayButton from "./_play-button.svelte";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import { AlbumDocument } from "~/graphql/types";
import type {
  Album, AlbumQuery
} from "~/graphql/types";
import Artists from "~/pages/artists/_artists.svelte";
import type {
  sortType, conditonsType
} from "~/pages/artists/_artists.svelte";

export let id = "";

const albumQuery = query<AlbumQuery>(AlbumDocument, {
  fetchPolicy: "cache-first",
  variables: { id }
});

let album: Album | undefined;

$: if ($albumQuery.data) {

  album = $albumQuery.data.album as Album;

}

const conditions: conditonsType = { albums: { id: [id] } };
const sort: sortType = {
  order: "POPULARITY",
  type: "DESC"
};
</script>

{#if album && album.artworkL.url}
  <Image src={album.artworkL.url} class="h-16 w-16" />
  <Text>{album.name}</Text>
  <Text>{album.copyright}</Text>

  {#each album.tracks as track, index (track.id)}
    <PlayButton {index} name={album.name} tracks={album.tracks} />
    <Text>{track.name}</Text>
    <AddPlaylistButton {track} />
  {/each}

  <Artists {conditions} {sort} />
{/if}

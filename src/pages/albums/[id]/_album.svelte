<script lang="ts">
import { query } from "svelte-apollo";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Favorite from "~/components/favorite.svelte";
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import { AlbumDocument } from "~/graphql/types";
import type {
  Album, AlbumQuery, ArtistsQueryVariables
} from "~/graphql/types";
import Artists from "~/pages/artists/_artists.svelte";
import ItemCard from "~/pages/tracks/_item-card.svelte";

export let id = "";

const albumQuery = query<AlbumQuery>(AlbumDocument, {
  fetchPolicy: "cache-first",
  variables: { id }
});

let album: Album | undefined;

$: if ($albumQuery.data) {

  album = $albumQuery.data.album as Album;

}

const variables: ArtistsQueryVariables = {
  conditions: { albums: { id: [id] } },
  sort: {
    order: "POPULARITY",
    type: "DESC"
  }
};
</script>

{#if album && album.artworkL.url}
  <Favorite type="album" id={album.id} />
  <AddPlaylistButton tracks={album.tracks.map((track) => track)} />
  <Image src={album.artworkL.url} class="h-16 w-16" />
  <Text>{album.name}</Text>
  <Text>{album.copyright}</Text>

  {#each album.tracks as track, index (track.id)}
    <ItemCard
      name={album.name}
      item={track}
      items={album.tracks.map((trk) => trk)}
      {index}
    />
  {/each}

  <Artists {variables} />
{/if}

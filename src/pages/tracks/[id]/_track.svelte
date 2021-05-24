<script lang="ts">
import { query } from "svelte-apollo";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Favorite from "~/components/favorite.svelte";
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import { TrackDocument } from "~/graphql/types";
import type {
  Track,
  TrackQuery,
  ArtistsQueryVariables,
  AlbumsQueryVariables
} from "~/graphql/types";
import Albums from "~/pages/albums/_albums.svelte";
import Artists from "~/pages/artists/_artists.svelte";
import ItemCard from "~/pages/tracks/_item-card.svelte";

export let id = "";

const trackQuery = query<TrackQuery>(TrackDocument, {
  fetchPolicy: "cache-first",
  variables: { id }
});

let track: Track | undefined;

$: if ($trackQuery.data) {

  track = $trackQuery.data.track as Track;

}

let artistsVariables: ArtistsQueryVariables;
$: artistsVariables = {
  conditions: { tracks: { id: [id] } },
  sort: {
    order: "POPULARITY",
    type: "DESC"
  }
};

let albumsVariables: AlbumsQueryVariables;
$: albumsVariables = {
  conditions: { tracks: { id: [id] } },
  sort: {
    order: "NEW",
    type: "DESC"
  }
};
</script>

{#if track && track.artworkL.url}
  <Favorite type="track" id={track.id} />
  <AddPlaylistButton tracks={[track]} />
  <Image src={track.artworkL.url} class="h-16 w-16" />
  <Text>{track.name}</Text>

  <ItemCard name={track.name} item={track} items={[track]} index={0} />

  <Artists variables={artistsVariables} />
  <Albums variables={albumsVariables} />
{/if}

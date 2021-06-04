<script lang="ts">
import { query } from "svelte-apollo";
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import { TrackDocument } from "~/graphql/types";
import type {
  Track,
  TrackQuery,
  ArtistsQueryVariables,
  AlbumsQueryVariables
} from "~/graphql/types";
import { convertTime } from "~/lib/convert";
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

<div class="track">
  {#if track && track.artworkL.url}
    <div class="separate">
      <Text class="text-white">Track</Text>
    </div>
    <div class="iamge">
      <Image src={track.artworkL.url} class="h-80 w-80" />
    </div>
    <div class="name">
      <Text>{track.name}</Text>
    </div>
    <div class="description">
      <Text class="text-base text-gray-400">
        再生時間 : {convertTime(track.durationMs)}
      </Text>
    </div>
    <div class="tracks">
      <ItemCard name={track.name} item={track} items={[track]} index={0} />
    </div>

    <div class="separate">
      <Text class="text-white">Artists</Text>
    </div>
    <div class="artists">
      <Artists variables={artistsVariables} />
    </div>

    <div class="separate">
      <Text class="text-white">Albums</Text>
    </div>
    <div class="albums">
      <Albums variables={albumsVariables} />
    </div>
  {/if}
</div>

<style lang="scss">
.track {
  @apply flex flex-col items-center;
  @apply mb-2;

  .name {
    @apply mt-2 text-center text-lg text-white w-80;
  }

  .description {
    @apply mt-2 text-center w-80;
  }

  .separate {
    @apply my-6 border-b-2 w-28 border-gray-500 text-lg text-center;
  }

  .tracks {
    @apply w-full px-4 divide-y divide-gray-700;
  }

  .artists,
  .albums {
    @apply mt-2;

    grid-template-columns: repeat(auto-fill, 175px);
    @apply my-2 w-full;
    @apply grid gap-1 justify-center justify-items-center items-center;
  }
}
</style>

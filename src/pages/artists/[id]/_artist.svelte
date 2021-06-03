<script lang="ts">
import { query } from "svelte-apollo";
import Favorite from "~/components/favorite.svelte";
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import { ArtistDocument } from "~/graphql/types";
import type {
  Artist,
  ArtistQuery,
  AlbumsQueryVariables
} from "~/graphql/types";
import Albums from "~/pages/albums/_albums.svelte";

export let id = "";

const artistQuery = query<ArtistQuery>(ArtistDocument, {
  fetchPolicy: "cache-first",
  variables: { id }
});

let artist: Artist | undefined;

$: if ($artistQuery.data) {

  artist = $artistQuery.data.artist as Artist;

}

const variables: AlbumsQueryVariables = {
  conditions: { artists: { id: [id] } },
  sort: {
    order: "RELEASE",
    type: "DESC"
  }
};
</script>

<div class="artist">
  {#if artist}
    <div class="separate">
      <Text class="text-white">Artist</Text>
    </div>
    <div class="iamge">
      <Image src={artist.artworkL?.url} class="h-80 w-80" />
    </div>
    <div class="name">
      <Text>{artist.name}</Text>
    </div>
    <div class="buttons">
      <Favorite type="artist" id={artist.id} />
    </div>

    <div class="separate">
      <Text class="text-white">Albums</Text>
    </div>
    <div class="albums">
      <Albums {variables} />
    </div>
  {/if}
</div>

<style lang="scss">
.artist {
  @apply flex flex-col items-center;
  @apply mb-2;

  .name {
    @apply mt-2 text-center text-lg text-white w-80;
  }

  .buttons {
    @apply mt-2;
    @apply flex flex-row space-x-2;
  }

  .separate {
    @apply my-6 border-b-2 w-28 border-gray-500 text-lg text-center;
  }

  .albums {
    @apply mt-2;

    grid-template-columns: repeat(auto-fill, 175px);
    @apply my-2 w-full;
    @apply grid gap-1 justify-center justify-items-center items-center;
  }
}
</style>

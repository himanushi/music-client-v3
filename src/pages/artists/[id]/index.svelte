<script lang="ts">
import { query } from "svelte-apollo";
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import { ArtistDocument } from "~/graphql/types";
import type {
  Artist, ArtistQuery
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

const albumConditions = { artists: { id: [id] } };
</script>

{#if artist}
  {#if artist.artworkL.url}
    <Image src={artist.artworkL.url} class="h-16 w-16" />
  {/if}
  <Text>{artist.name}</Text>
  <Albums conditions={albumConditions} />
{/if}

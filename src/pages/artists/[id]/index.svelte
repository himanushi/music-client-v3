<script lang="ts">
  import { query } from "svelte-apollo";
  import Image from "~/components/square-image.svelte";
  import Text from "~/components/text.svelte";
  import { ArtistDocument } from "~/graphql/types";
  import type { Artist, ArtistQuery } from "~/graphql/types";

  export let id = "";

  const artistQuery = query<ArtistQuery>(ArtistDocument, {
    "fetchPolicy": "cache-first",
    "variables": { id }
  });

  let artist: Artist | undefined;

  $: if ($artistQuery.data) {

    artist = $artistQuery.data.artist as Artist;

  }
</script>

{#if artist && artist.artworkL.url}
  <Image src={artist.artworkL.url} alt={artist.name} size={16} />
  <Text>{artist.name}</Text>
{/if}

<script lang="ts">
  import { query } from "svelte-apollo";
  import Image from "~/components/square-image.svelte";
  import Text from "~/components/text.svelte";
  import { AlbumDocument } from "~/graphql/types";
  import type { Album, AlbumQuery } from "~/graphql/types";

  export let id = "";

  const albumQuery = query<AlbumQuery>(AlbumDocument, {
    "fetchPolicy": "cache-first",
    "variables": { id }
  });

  let album: Album | undefined;

  $: if ($albumQuery.data) {

    album = $albumQuery.data.album as Album;

  }
</script>

{#if album && album.artworkL.url}
  <Image src={album.artworkL.url} alt={album.name} size={16} />
  <Text>{album.name}</Text>
  <Text>{album.copyright}</Text>

  {#each album.tracks as track (track.id)}
    <Text>{track.name}</Text>
  {/each}
{/if}

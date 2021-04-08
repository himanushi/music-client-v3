<script lang="ts">
import { query } from "svelte-apollo";
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import { PlaylistDocument } from "~/graphql/types";
import type { Playlist, PlaylistQuery } from "~/graphql/types";

export let id = "";

const playlistQuery = query<PlaylistQuery>(PlaylistDocument, {
  "fetchPolicy": "cache-first",
  "variables": { id }
});

let playlist: Playlist | undefined;

$: if ($playlistQuery.data) {

  playlist = $playlistQuery.data.playlist as Playlist;

}
</script>

{#if playlist}
  <Image
    src={playlist.track.artworkL.url}
    alt={playlist.track.name}
    size={16}
  />
  <Text>{playlist.name}</Text>

  {#each playlist.items as item, index ((item.id, index))}
    <Text>{item.track.name}</Text>
  {/each}
{/if}

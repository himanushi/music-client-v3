<script lang="ts">
import { goto } from "@roxi/routify";
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
  {#if playlist.track}
    <Image
      src={playlist.track.artworkL.url}
      alt={playlist.track.name}
      class="h-16 w-16"
    />
  {/if}

  <Text>{playlist.name}</Text>
  <Text>{playlist.description}</Text>

  {#if isMyPlaylist}
    <button on:click={edit}>編集</button>
  {/if}

  {#each playlist.items as item, index ((item.id, index))}
    <Text>{item.track.name}</Text>
  {/each}
{/if}

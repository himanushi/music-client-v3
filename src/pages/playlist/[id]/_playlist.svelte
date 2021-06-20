<script lang="ts">
import { query } from "svelte-apollo";
import DeleteButton from "./_delete-button.svelte";
import EditButton from "./_edit-button.svelte";
import AddAppleMusicPlaylistButton from "~/components/add-apple-music-playlist-button.svelte";
import AddAppleSpotifyButton from "~/components/add-apple-spotify-button.svelte";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Favorite from "~/components/favorite.svelte";
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import TwitterButton from "~/components/twitter-button.svelte";
import { PlaylistDocument } from "~/graphql/types";
import type {
  Playlist, PlaylistQuery
} from "~/graphql/types";
import {
  convertTime, toMs
} from "~/lib/convert";
import ItemCard from "~/pages/tracks/_item-card.svelte";

export let id = "";

$: playlistQuery = query<PlaylistQuery>(PlaylistDocument, {
  fetchPolicy: "no-cache",
  variables: { id }
});

let playlist: Playlist | undefined;
let isMyPlaylist = false;

$: if ($playlistQuery.data) {

  playlist = $playlistQuery.data.playlist as Playlist;
  isMyPlaylist = playlist?.isMine || false;

}

const hashtags = [
  "ゲーム音楽のプレイリスト",
  "ゲーム音楽"
];
</script>

<div class="playlist">
  {#if playlist}
    <div class="separate">
      <Text class="text-white">Playlist</Text>
    </div>
    <div class="iamge">
      <Image src={playlist.track?.artworkL?.url} class="h-80 w-80" />
    </div>
    <div class="name">
      <Text class="text-lg text-white">{playlist.name}</Text>
    </div>
    {#if playlist.author}
      <div class="user">
        <Text class="text-sm text-white">
          作者 : {playlist.author.name}(@{playlist.author.username})
        </Text>
      </div>
    {/if}
    <div class="description">
      <Text class="text-sm text-gray-400">{playlist.description}</Text>
    </div>
    <div class="description">
      <Text class="text-base text-gray-400">
        再生時間 : {convertTime(toMs(playlist.items.map((item) => item.track)))}
      </Text>
    </div>
    <div class="buttons">
      <TwitterButton
        title={playlist.name}
        path={`/playlist/${playlist.id}`}
        {hashtags}
      />
      <Favorite type="playlist" id={playlist.id} />
      <AddPlaylistButton
        class="w-10 h-10"
        tracks={playlist.items.map((item) => item.track)}
      />
    </div>

    <div class="services">
      <AddAppleMusicPlaylistButton
        name={playlist.name}
        description={`${location.origin}/playlist/${playlist.id}`}
        tracks={playlist.items.map((it) => it.track)}
      />

      <AddAppleSpotifyButton
        name={playlist.name}
        description={`${location.origin}/playlist/${playlist.id}`}
        tracks={playlist.items.map((it) => it.track)}
      />
    </div>

    <div class="separate">
      <Text class="text-white">Tracks</Text>
    </div>
    <div class="tracks">
      {#each playlist.items as item, index (`${item.id}_${index}`)}
        <ItemCard
          name={playlist.name}
          item={item.track}
          items={playlist.items.map((it) => it.track)}
          {index}
        />
      {/each}
    </div>
  {/if}
</div>

{#if isMyPlaylist}
  <EditButton {id} />
  <DeleteButton {id} />
{/if}

<style lang="scss">
.playlist {
  @apply flex flex-col items-center;
  @apply mb-20;

  .name {
    @apply mt-2 text-center w-80;
  }

  .description {
    @apply mt-2 text-center w-80;
  }

  .buttons {
    @apply mt-2;
    @apply flex flex-row space-x-2;
  }

  .services {
    @apply mt-2 space-x-2;
  }

  .tracks {
    @apply w-full px-4 divide-y divide-gray-700;
  }

  .separate {
    @apply my-6 border-b-2 w-28 border-gray-500 text-lg text-center;
  }
}
</style>

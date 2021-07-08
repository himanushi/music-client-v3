<script lang="ts">
import { query } from "svelte-apollo";
import AppleMusicButton from "./_apple-music-button.svelte";
import ItunesButton from "./_itunes-button.svelte";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Favorite from "~/components/favorite.svelte";
import AmazonMusic from "~/components/search-buttons/amazon-music.svelte";
import LineMusic from "~/components/search-buttons/line-music.svelte";
import Spotify from "~/components/search-buttons/spotify.svelte";
import YoutubeMusic from "~/components/search-buttons/youtube-music.svelte";
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import { AlbumDocument } from "~/graphql/types";
import type {
  Album,
  AlbumQuery,
  ArtistsQueryVariables,
  StatusEnum
} from "~/graphql/types";
import {
  convertDate, convertTime, toMs
} from "~/lib/convert";
import Artists from "~/pages/artists/_artists.svelte";
import ItemCard from "~/pages/tracks/_item-card.svelte";

export let id = "";

const albumQuery = query<AlbumQuery>(AlbumDocument, {
  fetchPolicy: "cache-first",
  variables: { id }
});

let album: Album | undefined;
let variables: ArtistsQueryVariables | undefined;

$: if ($albumQuery.data) {

  album = $albumQuery.data.album as Album;
  let status: StatusEnum[] = ["ACTIVE"];
  if (album.status !== "ACTIVE") {

    status = [
      "ACTIVE",
      "IGNORE",
      "PENDING"
    ];

  }
  variables = {
    conditions: {
      albums: { id: [id] },
      status
    },
    sort: {
      order: "POPULARITY",
      type: "DESC"
    }
  };

}
</script>

<div class="album">
  {#if album && album.artworkL.url}
    <div class="separate">
      <Text class="text-white">Album</Text>
    </div>
    {#if album.status !== "ACTIVE"}
      <div class="name">
        <Text class="text-lg text-red-300">Status : {album.status}</Text>
      </div>
    {/if}
    <div class="iamge">
      <Image src={album.artworkL.url} class="h-80 w-80" />
    </div>
    <div class="name">
      <Text class="text-lg text-white">{album.name}</Text>
    </div>
    <div class="description">
      <Text class="text-sm text-gray-400">{album.copyright}</Text>
    </div>
    <div class="description">
      <Text class="text-base text-gray-400">
        発売日/配信日 : {convertDate(album.releaseDate)}
      </Text>
    </div>
    <div class="description">
      <Text class="text-base text-gray-400">
        曲数: {album.tracks.length}曲
      </Text>
    </div>
    <div class="description">
      <Text class="text-base text-gray-400">
        再生時間 : {convertTime(toMs(album.tracks))}
      </Text>
    </div>
    <div class="buttons">
      <Favorite type="album" id={album.id} />
      <AddPlaylistButton
        class="w-10 h-10"
        tracks={album.tracks.map((track) => track)}
      />
    </div>
    <div class="services">
      {#if album.appleMusicAlbum}
        <AppleMusicButton id={album.appleMusicAlbum.appleMusicId} />
      {/if}
      {#if album.itunesAlbum}
        <ItunesButton id={album.itunesAlbum.appleMusicId} />
      {/if}
      <Spotify name={album.name} />
      <AmazonMusic name={album.name} />
      <YoutubeMusic name={album.name} />
      <LineMusic name={album.name} />
    </div>

    <div class="separate">
      <Text class="text-white">Tracks</Text>
    </div>
    <div class="tracks">
      {#each album.tracks as track, index (track.id)}
        <ItemCard
          viewImage={false}
          name={album.name}
          item={track}
          items={album.tracks.map((trk) => trk)}
          {index}
        />
      {/each}
    </div>

    <div class="separate">
      <Text class="text-white">Artists</Text>
    </div>

    {#if variables}
      <div class="artists">
        <Artists {variables} />
      </div>
    {/if}
  {/if}
</div>

<style lang="scss">
.album {
  @apply flex flex-col items-center;
  @apply mb-2;

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
    @apply mt-2 text-center;
  }

  .tracks {
    @apply w-full px-4 divide-y divide-gray-700;
  }

  .separate {
    @apply my-6 border-b-2 w-28 border-gray-500 text-lg text-center;
  }

  .artists {
    @apply mt-2;

    grid-template-columns: repeat(auto-fill, 175px);
    @apply my-2 w-full;
    @apply grid gap-1 justify-center justify-items-center items-center;
  }
}
</style>

<script lang="ts">
import { url } from "@roxi/routify";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Favorite from "~/components/favorite.svelte";
import PlayButton from "~/components/play-button.svelte";
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import type { Track } from "~/graphql/types";

export let index: number;
export let item: Track;
export let items: Track[];
// eslint-disable-next-line prefer-destructuring
export let name = "曲一覧";
export let viewImage = true;

const path = `/tracks/${item.id}`;
</script>

<div>
  {#if viewImage}
    <span class="image">
      <Image src={item.artworkM?.url} class="h-10 w-10" />
    </span>
  {/if}
  <span class="paly">
    <PlayButton {name} {index} tracks={items} />
  </span>
  <a class="name clickable" href={$url(path)}>
    <Text>{item.name}</Text>
  </a>
  <span class="buttons">
    <Favorite type="track" id={item.id} />
    <AddPlaylistButton class="w-10 h-10" tracks={[item]} />
  </span>
</div>

<style lang="scss">
div {
  @apply flex flex-row justify-center items-center w-full relative;
  @apply py-2;

  .paly {
    @apply flex-shrink-0 mr-2 z-10;
  }

  .image {
    @apply absolute left-0;
  }

  .name {
    @apply flex-1;
    @apply truncate text-white p-2 rounded;
  }

  .buttons {
    @apply flex-shrink-0 ml-2;
    @apply flex flex-row space-x-2;
  }
}
</style>

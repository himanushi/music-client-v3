<script lang="ts">
import { url } from "@roxi/routify";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Favorite from "~/components/favorite.svelte";
import PlayButton from "~/components/play-button.svelte";
import Text from "~/components/text.svelte";
import type { Track } from "~/graphql/types";

export let index: number;
export let item: Track;
export let items: Track[];
// eslint-disable-next-line prefer-destructuring
export let name = item.name;

const path = `/tracks/${item.id}`;
</script>

<div>
  <span class="paly">
    <PlayButton {name} {index} tracks={items} />
  </span>
  <a class="name clickable" href={$url(path)}>
    <Text>{item.name}</Text>
  </a>
  <span class="buttons">
    <Favorite type="track" id={item.id} />
    <AddPlaylistButton tracks={[item]} />
  </span>
</div>

<style lang="scss">
div {
  @apply flex flex-row justify-center items-center w-full;
  @apply py-2;

  .paly {
    @apply flex-shrink-0 mr-2;
  }

  .name {
    @apply flex-1;
    @apply truncate text-white p-2 rounded;
  }

  .buttons {
    @apply flex-shrink-0 ml-2;
  }
}
</style>

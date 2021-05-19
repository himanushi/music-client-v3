<script lang="ts">
import { url } from "@roxi/routify";
import Favorite from "~/components/favorite.svelte";
import PlayButton from "~/components/play-button.svelte";
import type { Track } from "~/graphql/types";

export let index: number;
export let item: Track;
export let items: Track[];

const path = `/tracks/${item.id}`;
</script>

<div class="w-40">
  <PlayButton name={item.name} {index} tracks={items} />
  <a class="card" href={$url(path)}>
    <span class="name">{item.name}</span>
  </a>
  <Favorite type="track" id={item.id} />
</div>

<style>
.card {
  /* 子要素の位置 */
  @apply flex flex-col;
}

.name {
  /* フォント */
  @apply truncate text-gray-400 text-xs;
  /* レイアウト */
  @apply p-1;
}
</style>

<script lang="ts">
import { url } from "@roxi/routify";
import Image from "~/components/square-image.svelte";

export let id = "";
export let src = "";
export let name = "";

const path = `/albums/${id}`;
</script>

<div class="w-40">
  <a class="card" href={$url(path)}>
    <Image {src} class="h-40 w-40" />
    <span class="name">{name}</span>
  </a>
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

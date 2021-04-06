<script lang="ts">
  import { url } from "@roxi/routify";
  import Image from "~/components/square-image.svelte";

  export let id = "";
  export let src = "";
  export let name = "";
  export let size = 40;

  const path = `/artists/${id}`;
</script>

<div class="w-{size}">
  <a class="card" href={$url(path)}>
    <div class="image w-{size}">
      <Image {src} alt={name} {size} />
    </div>
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

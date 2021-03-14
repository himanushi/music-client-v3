<script lang="ts">
  import Image from "~/components/square-image.svelte";

  export let src = "";
  export let name = "";
  export let size = 40;
</script>

<div class="card w-{size}">
  <div class="image w-{size}">
    <Image {src} alt={name} {size} />
  </div>
  <span class="name">{name}</span>
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

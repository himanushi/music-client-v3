<script lang="ts">
import { url } from "@roxi/routify";
import InfoIcon from "./_info-icon.svelte";
import Favorite from "~/components/favorite.svelte";
import Image from "~/components/square-image.svelte";
import type { Album } from "~/graphql/types";

export let item: Album;

const path = `/albums/${item.id}`;
</script>

<div class="w-40">
  <a class="card" href={$url(path)}>
    <Image src={item.artworkM?.url} class="h-40 w-40" />
    <span class="name">{item.name}</span>
  </a>
  <span class="favorite">
    <Favorite type="album" id={item.id} />
  </span>
  <span class="info">
    <InfoIcon {item} />
  </span>
</div>

<style lang="scss">
div {
  @apply relative;

  .card {
    @apply flex flex-col;

    .name {
      @apply truncate text-gray-400 text-xs;
      @apply p-1;
    }
  }

  .favorite {
    @apply absolute top-0 right-0;
  }

  .info {
    @apply absolute bottom-7 left-2;
  }
}
</style>

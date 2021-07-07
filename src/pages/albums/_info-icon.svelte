<script lang="ts">
import type { Album } from "~/graphql/types";

export let item: Album;
</script>

<div>
  {#if item.appleMusicAlbum}
    <span class="apple">A</span>
  {/if}
  {#if item.itunesAlbum}
    <span class="itunes">iT</span>
  {/if}
  {#if item.status === "PENDING"}
    <span class="pendding">PE</span>
  {/if}
  {#if item.status === "IGNORE"}
    <span class="ignore">IG</span>
  {/if}
</div>

<style lang="scss">
div {
  @apply flex flex-row space-x-0.5;

  span {
    @apply block text-white text-xs leading-4 w-4 h-4 text-center rounded-full pl-[0.055rem];
  }

  .apple {
    @apply bg-red-500;
  }
  .itunes {
    @apply bg-blue-500;
  }
  .pendding {
    @apply bg-yellow-400 text-black;
  }
  .ignore {
    @apply bg-red-400 text-black;
  }
}
</style>

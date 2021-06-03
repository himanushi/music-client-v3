<script lang="ts">
import { url } from "@roxi/routify";

export let id: string;
</script>

<a href={$url(`https://open.spotify.com/album/${id}`)} target="_blank">
  Spotify で聴く
</a>

<style lang="scss">
a {
  @apply rounded p-2;
  @apply bg-green-500 hover_bg-green-400 active_bg-green-300;
}
</style>

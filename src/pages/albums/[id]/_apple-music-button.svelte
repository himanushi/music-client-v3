<script lang="ts">
import { url } from "@roxi/routify";

export let id: string;
</script>

<a href={$url(`https://music.apple.com/jp/album/${id}`)} target="_blank">
  Apple Music で聴く
</a>

<style lang="scss">
a {
  @apply rounded p-2;
  @apply bg-red-500 hover_bg-red-400 active_bg-red-300;
}
</style>

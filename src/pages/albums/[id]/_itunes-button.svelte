<script lang="ts">
import { url } from "@roxi/routify";

export let id: string;
</script>

<a
  href={$url(`itmss://music.apple.com/jp/album/${id}?app=itunes`)}
  target="_blank"
>
  iTunes で聴く
</a>

<style lang="scss">
a {
  @apply rounded p-2;
  @apply bg-blue-500 hover_bg-blue-400 active_bg-blue-300;
}
</style>

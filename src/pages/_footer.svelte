<script lang="ts">
import IconButton from "~/components/icon-button.svelte";
import Image from "~/components/square-image.svelte";
import PlayIcon from "~/icons/play.svelte";
import SkipIcon from "~/icons/skip.svelte";
</script>

<footer>
  <div class="track-info">
    <div class="clickable">
      <Image class="h-10 w-10" />
      <span class="title">
        タイトルタイトルタタイトルタイトルタタイトルタイトルタタイトルタイトルタタイトルタイトルタタイトルタイトルタ
      </span>
    </div>
  </div>

  <IconButton>
    <PlayIcon color="text-gray-900" />
  </IconButton>

  <IconButton>
    <SkipIcon color="text-gray-900" />
  </IconButton>
</footer>

<style lang="scss">
/* デザインはあとで */
footer {
  @apply bg-green-800;
}
</style>

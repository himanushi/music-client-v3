<script lang="ts">
  import IconButton from "~/components/icon-button.svelte";
  import Image from "~/components/square-image.svelte";
  import PlayIcon from "~/icons/play.svelte";
  import SkipIcon from "~/icons/skip.svelte";
</script>

<footer>
  <div class="track-info text-button">
    <Image size={11} />
    <span class="title">
      タイトルタイトルタタイトルタイトルタタイトルタイトルタタイトルタイトルタタイトルタイトルタタイトルタイトルタ
    </span>
  </div>
  <div class="play-or-pause">
    <IconButton>
      <PlayIcon color="black" />
    </IconButton>
  </div>
  <div class="skip">
    <IconButton>
      <SkipIcon color="black" />
    </IconButton>
  </div>
</footer>

<style>
  footer {
    /* 子要素の位置 */
    @apply flex flex-row items-center;
    /* padding */
    @apply p-2.5 space-x-2;
    /* color */
    @apply bg-teal-500;
  }

  .track-info {
    /* サイズ可変 */
    @apply flex-1;
    /* 形 */
    @apply truncate rounded;
  }

  .title {
    /* フォント */
    @apply text-sm;
  }

  .play-or-pause,
  .skip {
    /* サイズ固定 */
    @apply flex-shrink-0;
  }
</style>

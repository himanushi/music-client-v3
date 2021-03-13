<script lang="ts">
  import IconButton from "~/components/icon-button.svelte";
  import Image from "~/components/square-image.svelte";
  import PlayIcon from "~/icons/play.svelte";
  import SkipIcon from "~/icons/skip.svelte";
</script>

<footer>
  <div class="track-info">
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
    @apply bg-teal-500;
    /* @apply fixed inset-x-0 bottom-0 p-2.5; */
    @apply flex flex-row items-center space-x-2;
  }

  .track-info {
    @apply bg-white bg-opacity-0 hover_bg-opacity-20;
    @apply flex-1 truncate rounded;
    @apply cursor-pointer;
  }

  .title {
    @apply text-sm;
  }

  .play-or-pause,
  .skip {
    @apply flex-shrink-0;
  }
</style>

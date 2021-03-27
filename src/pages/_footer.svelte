<script lang="ts">
  import IconButton from "~/components/icon-button.svelte";
  import Image from "~/components/square-image.svelte";
  import PlayIcon from "~/icons/play.svelte";
  import SkipIcon from "~/icons/skip.svelte";
</script>

<footer>
  <div class="track-info">
    <div class="clickable">
      <Image size={10} />
      <span class="title">
        タイトルタイトルタタイトルタイトルタタイトルタイトルタタイトルタイトルタタイトルタイトルタタイトルタイトルタ
      </span>
    </div>
  </div>

  <IconButton>
    <PlayIcon color="gray-900" />
  </IconButton>

  <IconButton>
    <SkipIcon color="gray-900" />
  </IconButton>
</footer>

<style lang="scss">
  footer {
    /* 子要素の位置 */
    @apply flex flex-row items-center;
    /* padding */
    @apply p-2;
    /* color */
    @apply bg-teal-500;

    :global(button) {
      /* サイズ固定 */
      @apply flex-shrink-0;
    }

    .track-info {
      /* サイズ可変 */
      @apply flex flex-row flex-1 w-0;

      div {
        /* 形 */
        @apply p-1 truncate rounded;

        :global(div) {
          @apply inline-flex;
        }

        .title {
          /* フォント */
          @apply text-sm;
        }
      }
    }
  }
</style>

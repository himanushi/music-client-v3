<script lang="ts">
import IconButton from "~/components/icon-button.svelte";
import Image from "~/components/square-image.svelte";
import PuaseIcon from "~/icons/pause.svelte";
import PlayIcon from "~/icons/play.svelte";
import SkipIcon from "~/icons/skip.svelte";
import { playerService } from "~/machines/jukebox-machine";

const play_or_pause = () => {

  playerService.send("PLAY_OR_PAUSE");

};

const skip = () => {

  playerService.send("NEXT_PLAY");

};
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

  <IconButton on:click={play_or_pause}>
    {#if $playerService.value === "playing"}
      <PuaseIcon color="text-gray-900" />
    {:else}
      <PlayIcon color="text-gray-900" />
    {/if}
  </IconButton>

  <IconButton on:click={skip}>
    <SkipIcon color="text-gray-900" />
  </IconButton>
</footer>

<style lang="scss">
/* デザインはあとで */
footer {
  @apply bg-green-800;
}
</style>

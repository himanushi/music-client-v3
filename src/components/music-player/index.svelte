<script>
import CloseButton from "./close-button.svelte";
import PlayerController from "./player-controller.svelte";
import TrackInfo from "./track-info.svelte";
</script>

<div on:click|stopPropagation class="player">
  <CloseButton />
  <TrackInfo />
  <PlayerController />
</div>

<style lang="scss">
.player {
  @apply h-full w-full bg-gray-500;
}
</style>

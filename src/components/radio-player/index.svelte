<script>
import PlayerController from "./player-controller.svelte";
import Timer from "./timer.svelte";
import TrackInfo from "./track-info.svelte";
</script>

<div>
  <TrackInfo />
  <PlayerController />
  <Timer />
</div>

<style lang="scss">
div {
  @apply space-y-2;
}
</style>

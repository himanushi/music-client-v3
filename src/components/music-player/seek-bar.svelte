<script lang="ts">
import { cubicOut } from "svelte/easing";
import { tweened } from "svelte/motion";
import Text from "~/components/text.svelte";
import { playerService } from "~/machines/jukebox-machine";

$: player = $playerService.context.musicPlayerRef;

// seek を滑らかに動かす
const seek = tweened(0, {
  "duration": 1000,
  "easing": cubicOut
});

$: if (player) {

  seek.set($player.context.seek);

}

const toMMSS = (duration: number) => {

  const sec = Math.floor(duration / 1000);
  const minutes = Math.floor(sec / 60);
  const seconds = sec - minutes * 60;

  const padding = (num: number) => `0${num}`.slice(-2);

  return `${padding(minutes)}:${padding(seconds)}`;

};
</script>

{#if player}
  <Text>{toMMSS($player.context.seek)}</Text>
  <input type="range" max={$player.context.duration} value={$seek} />
  <Text>-{toMMSS($player.context.duration - $player.context.seek)}</Text>
{/if}

<style lang="scss">
input {
  @apply w-full;
}
</style>

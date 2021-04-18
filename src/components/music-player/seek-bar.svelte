<script lang="ts">
import { tweened } from "svelte/motion";
import Text from "~/components/text.svelte";
import { playerService } from "~/machines/jukebox-machine";

// seek を滑らかに動かす
const seek = tweened(0, { "duration": (from, to) => {
  // seek が大幅に動いた時は滑らかでは不自然なので無効にする
  const tick = 1000;
  const diff = Math.abs(to - from);

  if (diff > tick + 100) {
    return 0;
  }

  return tick;
} });

const player = $playerService.context.musicPlayerRef;

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

const onChangeSeek = (event: Event) => {
  const { target } = event;

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  const { value } = target;

  if (player && value) {
    player.send({
      "seek": parseInt(value, 10),
      "type": "CHANGE_SEEK"
    });
  }
};
</script>

{#if player}
  <Text>{toMMSS($player.context.seek)}</Text>
  <input
    type="range"
    max={$player.context.duration}
    bind:value={$seek}
    on:change={onChangeSeek}
  />
  <Text>-{toMMSS($player.context.duration - $player.context.seek)}</Text>
{/if}

<style lang="scss">
input {
  @apply w-full;
}
</style>

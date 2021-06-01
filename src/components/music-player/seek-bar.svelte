<script lang="ts">
import { tweened } from "svelte/motion";
import SeekBar from "~/components/seek-bar.svelte";
import Text from "~/components/text.svelte";
import { playerService } from "~/machines/jukebox-machine";

// seek を滑らかに動かす
const seek = tweened(0, { duration: (from, to) => {

  // seek が大幅に動いた時は滑らかでは不自然なので無効にする
  const tick = 1000;
  const diff = Math.abs(to - from);

  if (diff > tick + 500) {

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

let seeking = false;
let seekValue = 0;

const onStart = (event: { detail: { value: number } }) => {

  seeking = true;
  seekValue = event.detail.value;

};

const onStop = (event: { detail: { value: number } }) => {

  seeking = false;

  if (player) {

    player.send({
      seek: event.detail.value,
      type: "CHANGE_SEEK"
    });

  }

};

$: seekValue = seeking ? seekValue : $seek;
</script>

{#if player}
  <div>
    <div class="text">
      <Text class="text-white px-4 pt-3">{toMMSS($player.context.seek)}</Text>
      <Text class="text-white px-4 pt-3"
        >{toMMSS($player.context.duration)}</Text
      >
    </div>
    <div class="seek">
      <SeekBar
        value={seekValue}
        min={0}
        max={$player.context.duration}
        formatter={toMMSS}
        on:start={onStart}
        on:stop={onStop}
      />
    </div>
  </div>
{/if}

<style lang="scss">
div {
  @apply w-full;

  .text {
    @apply flex justify-between;
  }
}
</style>

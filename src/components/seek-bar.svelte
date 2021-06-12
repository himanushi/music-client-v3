<script lang="ts">
import RangeSlider from "svelte-range-slider-pips/src/RangeSlider.svelte";
export let value: number;
export let min: number;
export let max: number;
export let formatter: (time: number) => string;
const id = "seek-bar" as never;

const range = "min" as unknown as boolean;
</script>

<RangeSlider
  {id}
  values={[value]}
  {min}
  {max}
  {formatter}
  float
  hover
  step={100}
  on:change
  on:start
  on:stop
  {range}
/>

<style lang="scss">
:global(.rangeSlider.range.min) {
  @apply bg-gray-300;
  :global(.rangeNub) {
    @apply bg-teal-500;
  }
  :global(.rangeFloat) {
    @apply bg-teal-500;
  }
  :global(.rangeBar) {
    @apply bg-teal-500;
  }
}

:global(.rangeSlider.range.min.focus) {
  :global(.rangeNub) {
    @apply bg-teal-500;
  }
}
</style>

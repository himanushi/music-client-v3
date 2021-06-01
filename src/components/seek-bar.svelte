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

<style global lang="scss">
// ref: https://simeydotme.github.io/svelte-range-slider-pips/#styling
.rangeSlider.min {
  @apply bg-gray-200;
}
.rangeSlider.range {
  @apply bg-gray-200;
}

.rangeSlider {
  @apply bg-teal-500;

  .rangeHandle > .rangeNub {
    @apply bg-teal-500;
  }
  .rangeBar {
    @apply bg-teal-500;
  }
}

.rangeSlider.focus {
  @apply bg-gray-200;

  .rangeHandle > .rangeNub {
    @apply bg-teal-500;
  }
  .rangeHandle > .rangeFloat {
    @apply bg-teal-500;
  }
  .rangeBar {
    @apply bg-teal-500;
  }
}
</style>

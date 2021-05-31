<script lang="ts">
import RangeSlider from "svelte-range-slider-pips/src/RangeSlider.svelte";
export let value: number;
export let min: number;
export let max: number;
export let formatter: (time: number) => string;
const id = "seek-bar" as never;
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
/>

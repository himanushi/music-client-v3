<script lang="ts">
import {
  size as defaultSize, color as defaultColor
} from "./default";
export let size = defaultSize;
export let color = defaultColor;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  class="{color} {size}"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M15 19l-7-7 7-7"
  />
</svg>

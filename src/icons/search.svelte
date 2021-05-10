<script lang="ts">
import {
  size as defaultSize, color as defaultColor
} from "./default";
export let size = defaultSize;
export let color = defaultColor;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class="{color} {size}"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  />
</svg>

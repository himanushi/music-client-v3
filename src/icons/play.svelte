<script lang="ts">
let className: string = "";
export { className as class };
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  class={className}
  viewBox="0 0 24 24"
>
  <defs>
    <filter id="shadow">
      <feDropShadow dx="0" dy="0" stdDeviation="0.3" />
    </filter>
  </defs>
  <path
    d="M15 12.3301L9 16.6603L9 8L15 12.3301Z"
    fill="currentColor"
    filter="url(#shadow)"
  />
</svg>

<script lang="ts">
let className = "";
export { className as class };
</script>

<div class={`prose ${className}`}>
  <slot />
</div>

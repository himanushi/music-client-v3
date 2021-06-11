<script lang="ts">
let className = "";
export { className as class };
</script>

<div class="markdown">
  <div class={`prose ${className}`}>
    <slot />
  </div>
</div>

<style lang="scss">
.markdown {
  @apply flex justify-center;
}
</style>

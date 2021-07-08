<script lang="ts">
let className = "";
export { className as class };
export let href: string;
</script>

<div>
  <a class={className} target="_blank" {href}><slot /></a>
</div>

<style lang="scss">
div {
  @apply p-2;

  a {
    @apply rounded p-2;
  }
}
</style>

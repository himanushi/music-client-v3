<script lang="ts">
export let src: string | null | undefined = null;
let className = "";
export { className as class };

let style = "";

if (src) {

  style = `background-image: url("${src}");`;

}
</script>

<div {style} class={className} />

<style lang="scss">
div {
  @apply block rounded bg-gray-600;

  /* img */
  @apply bg-cover bg-center bg-no-repeat;
}
</style>

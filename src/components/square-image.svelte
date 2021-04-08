<script lang="ts">
export let src: string | null | undefined = null;
export let alt = "no description";
export let size = 10;

let style = "";

if (src) {

  style = `background-image: url("${src}");`;

}
</script>

<div {style} {alt} class="h-{size} w-{size}" />

<style lang="scss">
div {
  @apply block rounded bg-gray-600;

  /* img */
  @apply bg-cover bg-center bg-no-repeat;
}
</style>

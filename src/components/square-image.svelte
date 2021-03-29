<script lang="ts">
  import Photograph from "~/icons/photograph.svelte";

  export let src: string | null | undefined = null;
  export let alt = "no description";
  export let size = 10;

  let style = "";

  if (src) {

    style = `background-image: url("${src}");`;

  }
</script>

<div {style} {alt} class="h-{size} w-{size}">
  {#if !src}
    <Photograph size={6} />
  {/if}
</div>

<style lang="scss">
  div {
    @apply flex justify-center place-items-center rounded bg-gray-600;

    /* img */
    @apply bg-cover bg-center bg-no-repeat;
  }
</style>

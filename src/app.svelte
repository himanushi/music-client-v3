<script lang="ts">
  import "./tailwind-styles.svelte";

  const name: string = "world";
</script>

<h1 class="hello">Hello {name}!</h1>

<style>
  .hello {
    @apply text-center;
  }
</style>

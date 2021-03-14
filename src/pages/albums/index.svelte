<script>
  import Albums from "./_albums.svelte";
</script>

<div class="albums">
  <Albums />
</div>

<style>
  .albums {
    @apply flex flex-wrap justify-around content-around;
  }
</style>

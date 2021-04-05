<script lang="ts">
  import Albums from "./_albums.svelte";
  import SearchBar from "./_search-bar.svelte";
</script>

<SearchBar />

<div class="albums">
  <Albums />
</div>

<style>
  .albums {
    @apply flex flex-wrap;
  }
</style>

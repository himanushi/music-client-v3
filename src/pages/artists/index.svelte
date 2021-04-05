<script lang="ts">
  import Artists from "./_artists.svelte";
  import SearchBar from "./_search-bar.svelte";
</script>

<SearchBar />

<div class="artists">
  <Artists />
</div>

<style>
  .artists {
    @apply flex flex-wrap;
  }
</style>

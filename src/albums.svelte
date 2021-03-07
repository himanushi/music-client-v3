<script lang="ts">
  import { query } from "svelte-apollo";
  import { AlbumsDocument } from "./graphql/types";
  const albums = query(AlbumsDocument)
</script>

{#if $albums.loading}
  Loading...
{:else if $albums.error}
  Error: {$albums.error.message}
{:else}
  {#each $albums.data.albums as album}
    {album.name}
  {/each}
{/if}

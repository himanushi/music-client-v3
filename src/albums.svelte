<script lang="ts">
  import { query } from "svelte-apollo";
  import { AlbumsDocument } from "./graphql/types";
  import type { AlbumsQuery, AlbumsQueryVariables } from "./graphql/types";
  const albums = query<AlbumsQuery, AlbumsQueryVariables>(AlbumsDocument)
</script>

{#if $albums.loading}
  Loading...
{:else if $albums.error}
  Error: {$albums.error}
{:else if $albums.data}
  {#each $albums.data.albums as album}
    {album.name}
  {/each}
{/if}

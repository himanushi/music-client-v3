<script>
  import {query} from "svelte-apollo";
  import Item from "./_item-card.svelte";
  import {AlbumsDocument} from "~/graphql/types";
  import type {AlbumsQuery} from "~/graphql/types";

  const albums = query<AlbumsQuery>(AlbumsDocument);
</script>

{#if $albums.data?.albums}
  {#each $albums.data.albums as album}
    <Item id={album.id} name={album.name} src={album.artworkM.url || ""} />
  {/each}
{/if}

<script lang="ts">
  import { getContext } from "svelte";
  import { query } from "svelte-apollo";
  import Item from "./_item-card.svelte";
  import InfiniteScroll from "~/components/infinite-scroll.svelte";
  import { AlbumsDocument } from "~/graphql/types";
  import type { AlbumsQuery } from "~/graphql/types";

  const albums = query<AlbumsQuery>(AlbumsDocument, {
    "fetchPolicy": "cache-first"
  });

  const { getElement } = getContext("content");
  const elementScroll: HTMLElement = getElement();
</script>

{#if $albums.data?.albums}
  {#each $albums.data.albums as album}
    <Item id={album.id} name={album.name} src={album.artworkM.url || ""} />
  {/each}
{/if}
<InfiniteScroll {elementScroll} on:loadMore={loadMore} />

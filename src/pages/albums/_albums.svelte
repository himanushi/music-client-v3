<script lang="ts">
  import { getContext } from "svelte";
  import { query } from "svelte-apollo";
  import Item from "./_item-card.svelte";
  import InfiniteScroll from "~/components/infinite-scroll.svelte";
  import { AlbumsDocument } from "~/graphql/types";
  import type {
    Album,
    AlbumsQuery,
    AlbumsQueryVariables
  } from "~/graphql/types";

  const limit = 30;
  let albums: Album[] = [];

  const albumsQuery = query<AlbumsQuery, AlbumsQueryVariables>(AlbumsDocument, {
    "fetchPolicy": "cache-first",
    "variables": {
      "cursor": {
        limit,
        "offset": 0
      }
    }
  });

  $: if ($albumsQuery.data) {

    albums = $albumsQuery.data.items as Album[];

  }

  const loadMore = async () => {

    console.log("load");

    const result = await albumsQuery.fetchMore({
      "updateQuery": (prev: any, options: any) => {

        if (!options.fetchMoreResult) {

          return prev;
  
        }

        return {
          ...prev,
          ...{ "items": [
            ...prev.items,
            ...options.fetchMoreResult.items
          ] }
        };
  
      },
      "variables": {
        "cursor": {
          "offset": albums.length
        }
      }
    });

    if (result.data) {

      albums = albums.concat(result.data.items as Album[]);
  
    }

  };

  const { getElement } = getContext("content");
  const elementScroll: HTMLElement = getElement();
</script>

{#each albums as album}
  <Item id={album.id} name={album.name} src={album.artworkM.url || ""} />
{/each}
<InfiniteScroll {elementScroll} on:loadMore={loadMore} />

<script lang="ts">
  import { params } from "@roxi/routify";
  import { getContext } from "svelte";
  import { query } from "svelte-apollo";
  import Item from "./_item-card.svelte";
  import Waypoint from "~/components/waypoint.svelte";
  import { AlbumsDocument } from "~/graphql/types";
  import type {
    Album,
    AlbumsQuery,
    AlbumsQueryVariables
  } from "~/graphql/types";
  import { SearchParams } from "~/lib/params";

  const limit = 50;
  let albums: Album[] = [];

  let name: string;
  $: name = $params[SearchParams.albums.name];
  $: console.dir(name);

  $: albumsQuery = query<AlbumsQuery, AlbumsQueryVariables>(AlbumsDocument, {
    "fetchPolicy": "cache-first",
    "variables": {
      "conditions": {
        name
      },
      "cursor": {
        limit,
        "offset": 0
      }
    }
  });

  const loadMore = async () => {

    await albumsQuery.fetchMore({
      "variables": {
        "cursor": {
          limit,
          "offset": albums.length
        }
      }
    });

  };

  $: if ($albumsQuery.data) {

    albums = $albumsQuery.data.albums as Album[];

  }

  const { getElement } = getContext("content");
  const elementScroll: HTMLElement = getElement();
</script>

{#each albums as album}
  <Item id={album.id} name={album.name} src={album.artworkM.url || ""} />
{/each}
<Waypoint threshold={300} {elementScroll} on:loadMore={loadMore} />

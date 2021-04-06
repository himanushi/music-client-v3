<script lang="ts">
  import { params } from "@roxi/routify";
  import { getContext } from "svelte";
  import { query } from "svelte-apollo";
  import Item from "./_item-card.svelte";
  import Waypoint from "~/components/waypoint.svelte";
  import { ArtistsDocument } from "~/graphql/types";
  import type {
    Artist,
    ArtistsQuery,
    ArtistsQueryVariables
  } from "~/graphql/types";
  import { SearchParams } from "~/lib/params";

  const limit = 50;
  let artists: Artist[] = [];

  let name: string;
  $: name = $params[SearchParams.album.keyword];

  $: artistsQuery = query<ArtistsQuery, ArtistsQueryVariables>(
    ArtistsDocument,
    {
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
    }
  );

  const loadMore = async () => {

    await artistsQuery.fetchMore({
      "variables": {
        "cursor": {
          limit,
          "offset": artists.length
        }
      }
    });

  };

  $: if ($artistsQuery.data) {

    artists = $artistsQuery.data.artists as Artist[];

  }

  const { getElement } = getContext("content");
  const elementScroll: HTMLElement = getElement();
</script>

{#each artists as artist (artist.id)}
  <Item id={artist.id} name={artist.name} src={artist.artworkM.url || ""} />
{/each}
<Waypoint threshold={300} {elementScroll} on:loadMore={loadMore} />

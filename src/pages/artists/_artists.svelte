<script lang="ts" context="module">
// ↓ これどうにかしたい
// eslint-disable-next-line import/order
import type {
  ArtistsConditionsInputObject,
  ArtistsSortInputObject
} from "~/graphql/types";
// eslint-disable-next-line import/order
import type { Mutable } from "~/@types/extends";

export type conditonsType = Mutable<ArtistsConditionsInputObject>;
export type sortType = Mutable<ArtistsSortInputObject>;
</script>

<script lang="ts">
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

export let conditions: conditonsType = {};
export let sort: sortType = {};

const limit = 50;
let artists: Artist[] = [];

$: artistsQuery = query<ArtistsQuery, ArtistsQueryVariables>(ArtistsDocument, {
  fetchPolicy: "cache-first",
  variables: {
    conditions,
    cursor: {
      limit,
      offset: 0
    },
    sort
  }
});

const loadMore = async () => {

  await artistsQuery.fetchMore({ variables: { cursor: {
    limit,
    offset: artists.length
  } } });

};

$: if ($artistsQuery.data) {

  artists = $artistsQuery.data.artists as Artist[];

}

const { getElement } = getContext("content");
const elementScroll: HTMLElement = getElement();
</script>

{#each artists as artist, index (`${artist.id}_${index}`)}
  <Item id={artist.id} name={artist.name} src={artist.artworkM.url || ""} />
{/each}
<Waypoint threshold={300} {elementScroll} on:loadMore={loadMore} />

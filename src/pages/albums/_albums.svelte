<script lang="ts" context="module">
// ↓ これどうにかしたい
// eslint-disable-next-line import/order
import type {
  AlbumsConditionsInputObject,
  AlbumsSortInputObject
} from "~/graphql/types";
// eslint-disable-next-line import/order
import type { Mutable } from "~/@types/extends";

export type conditonsType = Mutable<AlbumsConditionsInputObject>;
export type sortType = Mutable<AlbumsSortInputObject>;
</script>

<script lang="ts">
import { getContext } from "svelte";
import { query } from "svelte-apollo";
import Item from "./_item-card.svelte";
import Waypoint from "~/components/waypoint.svelte";
import { AlbumsDocument } from "~/graphql/types";
import type {
  Album, AlbumsQuery, AlbumsQueryVariables
} from "~/graphql/types";

export let conditions: conditonsType = {};
export let sort: sortType = {};

const limit = 50;
let albums: Album[] = [];

$: albumsQuery = query<AlbumsQuery, AlbumsQueryVariables>(AlbumsDocument, {
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

  await albumsQuery.fetchMore({ variables: { cursor: {
    limit,
    offset: albums.length
  } } });

};

$: if ($albumsQuery.data) {

  albums = $albumsQuery.data.albums as Album[];

}

const { getElement } = getContext("content");
const elementScroll: HTMLElement = getElement();
</script>

{#each albums as album, index (`${album.id}_${index}`)}
  <Item id={album.id} name={album.name} src={album.artworkM.url || ""} />
{/each}
<Waypoint threshold={300} {elementScroll} on:loadMore={loadMore} />

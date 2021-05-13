<script lang="ts" context="module">
// ↓ これどうにかしたい
// eslint-disable-next-line import/order
import type {
  PlaylistsConditionsInputObject,
  PlaylistsSortInputObject
} from "~/graphql/types";
// eslint-disable-next-line import/order
import type { Mutable } from "~/@types/extends";

export type conditonsType = Mutable<PlaylistsConditionsInputObject>;
export type sortType = Mutable<PlaylistsSortInputObject>;
</script>

<script lang="ts">
import { getContext } from "svelte";
import { query } from "svelte-apollo";
import Item from "./_item-card.svelte";
import Waypoint from "~/components/waypoint.svelte";
import { PlaylistsDocument } from "~/graphql/types";
import type {
  Playlist,
  PlaylistsQuery,
  PlaylistsQueryVariables
} from "~/graphql/types";

export let conditions: conditonsType = {};
export let sort: sortType = {};

const limit = 50;
let playlists: Playlist[] = [];

$: playlistsQuery = query<PlaylistsQuery, PlaylistsQueryVariables>(
  PlaylistsDocument,
  {
    fetchPolicy: "no-cache",
    variables: {
      conditions,
      cursor: {
        limit,
        offset: 0
      },
      sort
    }
  }
);

const loadMore = async () => {

  await playlistsQuery.fetchMore({ variables: { cursor: {
    limit,
    offset: playlists.length
  } } });

};

$: if ($playlistsQuery.data) {

  playlists = $playlistsQuery.data.playlists as Playlist[];

}

const { getElement } = getContext("content");
const elementScroll: HTMLElement = getElement();
</script>

{#each playlists as playlist, index (`${playlist.id}_${index}`)}
  <Item
    id={playlist.id}
    name={playlist.name}
    src={playlist.track?.artworkM.url || undefined}
  />
{/each}
<Waypoint threshold={300} {elementScroll} on:loadMore={loadMore} />

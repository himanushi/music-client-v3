<script lang="ts" context="module">
// ↓ これどうにかしたい
// eslint-disable-next-line import/order
import type { PlaylistsConditionsInputObject } from "~/graphql/types";
// eslint-disable-next-line import/order
import type { Mutable } from "~/@types/extends";

export type conditonsType = Mutable<PlaylistsConditionsInputObject>;
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

const limit = 50;
let playlists: Playlist[] = [];

$: playlistsQuery = query<PlaylistsQuery, PlaylistsQueryVariables>(
  PlaylistsDocument,
  {
    "fetchPolicy": "cache-first",
    "variables": {
      conditions,
      "cursor": {
        limit,
        "offset": 0
      }
    }
  }
);

const loadMore = async () => {

  await playlistsQuery.fetchMore({
    "variables": {
      "cursor": {
        limit,
        "offset": playlists.length
      }
    }
  });

};

$: if ($playlistsQuery.data) {

  playlists = $playlistsQuery.data.playlists as Playlist[];

}

const { getElement } = getContext("content");
const elementScroll: HTMLElement = getElement();
</script>

{#each playlists as playlist, index ((playlist.id, index))}
  <Item
    id={playlist.id}
    name={playlist.name}
    src={playlist.track?.artworkM.url || undefined}
  />
{/each}
<Waypoint threshold={300} {elementScroll} on:loadMore={loadMore} />

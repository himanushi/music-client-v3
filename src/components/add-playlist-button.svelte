<script lang="ts">
import {
  getClient, mutation
} from "svelte-apollo";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import Selection from "~/components/selection.svelte";
import type { selectionType } from "~/components/selection.svelte";
import {
  PlaylistsDocument,
  AddPlaylistItemsDocument,
  PlaylistDocument
} from "~/graphql/types";
import type {
  Track, AddPlaylistItemsMutationVariables
} from "~/graphql/types";
import AddPlaylistIcon from "~/icons/add-playlist.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

let className = "";
export { className as class };
export let tracks: Track[];

const addPlaylist = mutation<unknown, AddPlaylistItemsMutationVariables>(
  AddPlaylistItemsDocument
);

const client = getClient();

// eslint-disable-next-line max-lines-per-function
const showMyPlaylist = async () => {

  const result = await client.query({
    fetchPolicy: "no-cache",
    query: PlaylistsDocument,
    variables: {
      conditions: { isMine: true },
      cursor: {
        limit: 1000,
        offset: 0
      },
      sort: {
        order: "UPDATE",
        type: "DESC"
      }
    }
  });

  const playlists = result?.data?.items;

  if (playlists.length > 0) {

    modals.open<selectionType>({
      component: Selection,
      props: { lists: playlists.map((playlsit) => ({
        onClick: async () => {

          await addPlaylist({
            refetchQueries: [
              {
                query: PlaylistDocument,
                variables: { id: playlsit.id }
              }
            ],
            variables: { input: {
              playlistId: playlsit.id,
              trackIds: tracks.map((track) => track.id)
            } }
          });

          // toasts.open<Props>({
          //   component: AddedPlaylistMessage,
          //   props: {
          //     id: playlsit.id,
          //     name: playlsit.name
          //   },
          //   type: "info"
          // });

        },
        text: playlsit.name
      })) }
    });

  } else {
    // toasts.open({
    //   component: NoPlaylistMessage,
    //   type: "info"
    // });
  }

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, [
"playlists",
"addPlaylistItems"
])}
  <IconButton on:click={showMyPlaylist} class={className}>
    <AddPlaylistIcon class={`text-white ${className}`} />
  </IconButton>
{/if}

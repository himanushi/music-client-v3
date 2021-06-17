<script lang="ts">
import {
  getClient, mutation
} from "svelte-apollo";
import NoPlaylistMessage from "./toast-messages/no-playlist-message.svelte";
import Selection from "~/components/add-playlist-selection.svelte";
import type { selectionType } from "~/components/add-playlist-selection.svelte";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import type { Props } from "~/components/toast-messages/added-playlist-message.svelte";
import AddedPlaylistMessage from "~/components/toast-messages/added-playlist-message.svelte";
import { toasts } from "~/components/toasts.svelte";
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

  modals.close();

  if (playlists.length > 0) {

    modals.open<selectionType>({
      component: Selection,
      props: {
        label: "プレイリストに追加",
        lists: playlists.map((playlsit) => ({
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

            modals.close();

            toasts.open<Props>({
              closeMs: 10000,
              component: AddedPlaylistMessage,
              props: {
                id: playlsit.id,
                name: playlsit.name
              }
            });

          },
          text: playlsit.name
        }))
      }
    });

  } else {

    toasts.open({
      closeMs: 5000,
      component: NoPlaylistMessage
    });

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

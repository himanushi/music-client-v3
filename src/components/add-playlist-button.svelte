<script lang="ts">
import {
  getClient, mutation
} from "svelte-apollo";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import Selection from "~/components/selection.svelte";
import type { selectionType } from "~/components/selection.svelte";
import {
  SelectPlaylistsDocument,
  AddPlaylistItemsDocument
} from "~/graphql/types";
import type {
  Track, AddPlaylistItemsMutationVariables
} from "~/graphql/types";
import AddPlaylistIcon from "~/icons/add-playlist.svelte";

export let track: Track;

const addPlaylist = mutation<unknown, AddPlaylistItemsMutationVariables>(
  AddPlaylistItemsDocument
);

const client = getClient();

const showMyPlaylist = async () => {

  const result = await client.query({
    fetchPolicy: "no-cache",
    query: SelectPlaylistsDocument,
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

  const playlists = result?.data?.playlists;

  if (playlists) {

    modals.open<selectionType>({
      component: Selection,
      props: { lists: playlists.map((playlsit) => ({
        onClick: async () => {

          await addPlaylist({
            awaitRefetchQueries: true,
            variables: { input: {
              playlistId: playlsit.id,
              trackIds: [track.id]
            } }
          });

        },
        text: playlsit.name
      })) }
    });

  }

};
</script>

<IconButton on:click={showMyPlaylist}>
  <AddPlaylistIcon />
</IconButton>

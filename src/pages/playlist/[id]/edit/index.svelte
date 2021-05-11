<script lang="ts">
import {
  goto, params
} from "@roxi/routify";
import {
  mutation, query
} from "svelte-apollo";
import PlayButton from "../_play-button.svelte";
import DndSelection from "~/components/dnd-selection.svelte";
import type { ItemsType } from "~/components/dnd-selection.svelte";
import Text from "~/components/text.svelte";
import {
  PlaylistDocument, UpsertPlaylistDocument
} from "~/graphql/types";
import type {
  Playlist,
  PlaylistQuery,
  PlaylistPublicTypeEnum,
  UpsertPlaylistMutationVariables
} from "~/graphql/types";

const id = $params.id as string;

let name = "";
let description = "";
let publicType: PlaylistPublicTypeEnum = "NON_OPEN";
let initialize = true;
let items: ItemsType = [];

const playlistQuery = query<PlaylistQuery>(PlaylistDocument, {
  fetchPolicy: "no-cache",
  variables: { id }
});

// 初期化
$: if ($playlistQuery.data && initialize) {

  const playlist = $playlistQuery.data.playlist as Playlist;

  ({
    name, description, publicType
  } = playlist);

  items = playlist.items.map((it, index) => ({
    id: index,
    index,
    item: it.track
  }));

  initialize = false;

}

const upsertPlaylist = mutation<unknown, UpsertPlaylistMutationVariables>(
  UpsertPlaylistDocument
);

const update = async () => {

  try {

    await upsertPlaylist({ variables: { input: {
      description,
      name,
      playlistId: id,
      publicType,
      trackIds: items.map((it) => it.item.id)
    } } });

    $goto("/playlist/:id", { id });

  } catch (error) {
    // console.error({ error });
  }

};

const changeItems = (
  event: CustomEvent & {
    detail: { items: any[] };
  }
) => {

  ({ items } = event.detail);

};
</script>

<form on:submit|preventDefault>
  <label for="name"> 名前 </label>
  <input id="name" type="text" bind:value={name} />

  <label for="description"> 説明 </label>
  <input id="description" type="text" bind:value={description} />

  <label for="public-option">公開設定</label>
  <select id="public-option" bind:value={publicType}>
    <option value="NON_OPEN">非公開</option>
    <option value="OPEN">公開</option>
    <option value="ANONYMOUS_OPEN">匿名公開</option>
  </select>

  <DndSelection
    on:remove={changeItems}
    on:decide={changeItems}
    {items}
    let:item
    let:index
  >
    <PlayButton {name} {index} tracks={items.map((it) => it.item)} />
    <Text>{item.item.name}</Text>
  </DndSelection>

  <button on:click={update}>保存</button>
</form>

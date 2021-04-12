<script lang="ts">
import { mutation } from "svelte-apollo";
import { modal } from "~/components/modal.svelte";
import { UpsertPlaylistDocument } from "~/graphql/types";
import type {
  PlaylistPublicTypeEnum,
  UpsertPlaylistMutationVariables
} from "~/graphql/types";

const upsertPlaylist = mutation<unknown, UpsertPlaylistMutationVariables>(
  UpsertPlaylistDocument
);

let name = "";
let description = "";
let publicType: PlaylistPublicTypeEnum = "NON_OPEN";

const create = async () => {

  try {

    await upsertPlaylist({
      "variables": {
        "input": {
          description,
          name,
          publicType,
          "trackIds": []
        }
      }
    });

    modal.set(null);

  } catch (error) {
    // console.error({ error });
  }

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

  <button on:click={create}>保存</button>
</form>

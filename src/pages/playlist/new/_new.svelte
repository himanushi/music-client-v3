<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import InputText from "~/components/input-text.svelte";
import Messages from "~/components/messages.svelte";
import { UpsertPlaylistDocument } from "~/graphql/types";
import type {
  PlaylistPublicTypeEnum,
  UpsertPlaylistMutationVariables,
  UpsertPlaylistMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";

const upsertPlaylist = mutation<
  UpsertPlaylistMutation,
  UpsertPlaylistMutationVariables
>(UpsertPlaylistDocument);

let name = "";
let description = "";
let publicType: PlaylistPublicTypeEnum = "NON_OPEN";
let messages: Record<string, string[]> = {};

const create = async () => {

  try {

    await upsertPlaylist({ variables: { input: {
      description,
      name,
      publicType,
      trackIds: []
    } } });

    $goto("/playlist", { pm: "1" });

  } catch (error) {

    if (error instanceof ApolloError) {

      messages = errorMessages(error);

    }

  }

};
</script>

<form on:submit|preventDefault>
  <InputText label="タイトル" bind:value={name} errorMessages={messages.name} />

  <InputText
    label="説明"
    bind:value={description}
    errorMessages={messages.description}
  />

  <label for="public-option">公開設定</label>
  <select id="public-option" bind:value={publicType}>
    <option value="NON_OPEN">非公開</option>
    <option value="OPEN">公開</option>
    <option value="ANONYMOUS_OPEN">匿名公開</option>
  </select>
  <Messages messages={messages.publicType} />

  <Messages messages={messages._} />
  <button on:click={create}>保存</button>
</form>

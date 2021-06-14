<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import Button from "~/components/button.svelte";
import InputText from "~/components/input-text.svelte";
import Messages from "~/components/messages.svelte";
import { UpsertPlaylistDocument } from "~/graphql/types";
import type {
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
let messages: Record<string, string[]> = {};

const create = async () => {

  try {

    await upsertPlaylist({ variables: { input: {
      description,
      name,
      publicType: "NON_OPEN",
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
  <InputText
    label="タイトル"
    bind:value={name}
    errorMessages={messages.name}
    class="w-80"
  />

  <InputText
    label="説明"
    bind:value={description}
    errorMessages={messages.description}
    class="w-80"
  />

  <Messages messages={messages.publicType} />

  <Button class="text-center" on:click={create} messages={messages._}>
    保存
  </Button>
</form>

<style lang="scss">
form {
  @apply text-white flex flex-col items-center space-y-5 py-2;
}
</style>

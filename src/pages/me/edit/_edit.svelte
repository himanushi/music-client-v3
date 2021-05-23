<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import InputText from "~/components/input-text.svelte";
import Messages from "~/components/messages.svelte";
import {
  UpdateMeDocument, MeDocument
} from "~/graphql/types";
import type {
  UpdateMeMutationVariables,
  UpdateMeMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";

export let name: string;
let currentPassword: string;
let newPassword: string;
let newPasswordConfirmation: string;
let messages: Record<string, string[]> = {};

const mutate = mutation<UpdateMeMutation, UpdateMeMutationVariables>(
  UpdateMeDocument
);

const signup = async () => {

  try {

    await mutate({
      refetchQueries: [{ query: MeDocument }],
      variables: { input: {
        currentPassword,
        name,
        newPassword,
        newPasswordConfirmation
      } }
    });

    $goto("/me");

  } catch (error) {

    if (error instanceof ApolloError) {

      messages = errorMessages(error);

    }

  }

};
</script>

<form on:submit|preventDefault>
  <InputText label="名前" bind:value={name} errorMessages={messages.name} />
  <InputText
    label="現在のパスワード"
    type="password"
    bind:value={currentPassword}
    errorMessages={messages.currentPassword}
    autocomplete="new-password"
  />
  <InputText
    label="新しいパスワード"
    type="password"
    bind:value={newPassword}
    errorMessages={messages.newPassword}
    autocomplete="new-password"
  />
  <InputText
    label="新しいパスワード再確認"
    type="password"
    bind:value={newPasswordConfirmation}
    errorMessages={messages.newPasswordConfirmation}
    autocomplete="new-password"
  />

  <Messages type="error" messages={messages._} />
  <input on:click={signup} type="submit" value="更新" />
</form>

<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import Button from "~/components/button.svelte";
import InputText from "~/components/input-text.svelte";
import Separate from "~/components/separate.svelte";
import Message from "~/components/toast-messages/message.svelte";
import { toasts } from "~/components/toasts.svelte";
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

const mutate =
  mutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument);

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

    toasts.open({
      closeMs: 3000,
      component: Message,
      props: {
        text: "更新しました",
        type: "success"
      }
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
  <Separate text="User" />

  <InputText
    label="名前"
    bind:value={name}
    errorMessages={messages.name}
    class="w-80"
  />

  <Button class="text-center" on:click={signup} messages={messages._}>
    更新
  </Button>

  <Separate text="Password" />

  <InputText
    label="現在のパスワード"
    type="password"
    bind:value={currentPassword}
    errorMessages={messages.currentPassword}
    autocomplete="new-password"
    class="w-80"
  />
  <InputText
    label="新しいパスワード"
    type="password"
    bind:value={newPassword}
    errorMessages={messages.newPassword}
    autocomplete="new-password"
    class="w-80"
  />
  <InputText
    label="新しいパスワード再確認"
    type="password"
    bind:value={newPasswordConfirmation}
    errorMessages={messages.newPasswordConfirmation}
    autocomplete="new-password"
    class="w-80"
  />

  <Button class="text-center" on:click={signup} messages={messages._}>
    更新
  </Button>
</form>

<style lang="scss">
form {
  @apply text-white flex flex-col items-center space-y-5 py-2;
}
</style>

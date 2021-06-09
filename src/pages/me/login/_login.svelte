<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import Button from "~/components/button.svelte";
import InputText from "~/components/input-text.svelte";
import Messages from "~/components/messages.svelte";
import RecaptchaV2 from "~/components/recaptcha-v2.svelte";
import Message from "~/components/toast-messages/message.svelte";
import { toasts } from "~/components/toasts.svelte";
import {
  LoginDocument, MeDocument
} from "~/graphql/types";
import type {
  LoginMutationVariables, LoginMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";

let currentPassword: string;
let username: string;
let recaptcha: RecaptchaV2;
let messages: Record<string, string[]> = {};

const mutate = mutation<LoginMutation, LoginMutationVariables>(LoginDocument);

const login = async () => {

  try {

    await mutate({
      refetchQueries: [{ query: MeDocument }],
      variables: { input: {
        currentPassword,
        username
      } }
    });

    toasts.open({
      closeMs: 3000,
      component: Message,
      props: {
        text: "ログインしました",
        type: "success"
      }
    });

    $goto("/me");

  } catch (error) {

    if (error instanceof ApolloError) {

      messages = errorMessages(error);
      recaptcha.reset();

    }

  }

};
</script>

<form on:submit|preventDefault>
  <InputText
    label="ユーザー名"
    bind:value={username}
    errorMessages={messages.username}
    autocomplete="username"
    class="w-80"
  />
  <InputText
    label="パスワード"
    type="password"
    bind:value={currentPassword}
    errorMessages={messages.currentPassword}
    autocomplete="current-password"
    class="w-80"
  />
  <RecaptchaV2 bind:this={recaptcha} />
  <Messages class="text-center" type="error" messages={messages.recaptcha} />

  <Button class="text-center" on:click={login} messages={messages._}>
    ログイン
  </Button>
</form>

<style lang="scss">
form {
  @apply text-white flex flex-col items-center space-y-5 py-2;
}
</style>

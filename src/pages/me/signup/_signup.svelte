<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import Button from "~/components/button.svelte";
import InputCheckbox from "~/components/input-checkbox.svelte";
import InputText from "~/components/input-text.svelte";
import Messages from "~/components/messages.svelte";
import RecaptchaV2 from "~/components/recaptcha-v2.svelte";
import Message from "~/components/toast-messages/message.svelte";
import { toasts } from "~/components/toasts.svelte";
import {
  SignupDocument, MeDocument
} from "~/graphql/types";
import type {
  SignupMutationVariables, SignupMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";

let name: string;
let username: string;
let newPassword: string;
let newPasswordConfirmation: string;
let recaptcha: RecaptchaV2;
let messages: Record<string, string[]> = {};
let term: boolean;

const mutate =
  mutation<SignupMutation, SignupMutationVariables>(SignupDocument);

const signup = async () => {

  try {

    await mutate({
      refetchQueries: [{ query: MeDocument }],
      variables: { input: {
        name,
        newPassword,
        newPasswordConfirmation,
        username
      } }
    });

    toasts.open({
      closeMs: 8000,
      component: Message,
      props: {
        text: "登録しました。音楽を楽しみましょう！",
        type: "success"
      }
    });

    $goto("/");

  } catch (error) {

    if (error instanceof ApolloError) {

      recaptcha.reset();
      messages = errorMessages(error);

    }

  }

};
</script>

<form on:submit|preventDefault>
  <InputText
    label="名前(変更可能)"
    bind:value={name}
    errorMessages={messages.name}
    class="w-80"
  />
  <InputText
    label="ユーザーID(変更不可, 半角英数 と _ のみ)"
    bind:value={username}
    errorMessages={messages.username}
    autocomplete="username"
    class="w-80"
  />
  <InputText
    label="パスワード(8文字以上, 半角英数)"
    type="password"
    bind:value={newPassword}
    errorMessages={messages.newPassword}
    autocomplete="new-password"
    class="w-80"
  />
  <InputText
    label="パスワード再確認"
    type="password"
    bind:value={newPasswordConfirmation}
    errorMessages={messages.newPasswordConfirmation}
    class="w-80"
  />

  <a target="_blank" href="/terms">利用規約はこちら</a>
  <InputCheckbox label="利用規約に同意する" bind:checked={term} />

  <RecaptchaV2 bind:this={recaptcha} />
  <Messages class="text-center" type="error" messages={messages.recaptcha} />

  <Button
    disabled={!term}
    class="text-center"
    on:click={signup}
    messages={messages._}
  >
    登録
  </Button>
</form>

<style lang="scss">
form {
  @apply text-white flex flex-col items-center space-y-5 py-5;

  a {
    @apply font-bold underline;
  }
}
</style>

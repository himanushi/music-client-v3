<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import InputText from "~/components/input-text.svelte";
import Messages from "~/components/messages.svelte";
import RecaptchaV2 from "~/components/recaptcha-v2.svelte";
import {
  SignupDocument, MeDocument
} from "~/graphql/types";
import type {
  SignupMutationVariables, SignupMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";

let name: string;
let username: string;
let password: string;
let passwordConfirmation: string;
let recaptcha: RecaptchaV2;
let messages: Record<string, string[]> = {};

const mutate = mutation<SignupMutation, SignupMutationVariables>(
  SignupDocument
);

const signup = async () => {

  try {

    await mutate({
      refetchQueries: [{ query: MeDocument }],
      variables: { input: {
        name,
        password,
        passwordConfirmation,
        username
      } }
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
  <InputText label="名前" bind:value={name} errorMessages={messages.name} />
  <InputText
    label="ユーザーID"
    bind:value={username}
    errorMessages={messages.username}
    autocomplete="username"
  />
  <InputText
    label="パスワード"
    type="password"
    bind:value={password}
    errorMessages={messages.password}
    autocomplete="new-password"
  />
  <InputText
    label="再確認パスワード"
    type="password"
    bind:value={passwordConfirmation}
    errorMessages={messages.passwordConfirmation}
    autocomplete="new-password"
  />
  <RecaptchaV2 bind:this={recaptcha} />

  <Messages type="error" messages={messages.recaptcha} />
  <Messages type="error" messages={messages._} />
  <input on:click={signup} type="submit" value="登録" />
</form>

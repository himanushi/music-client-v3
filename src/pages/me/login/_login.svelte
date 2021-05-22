<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import InputText from "~/components/input-text.svelte";
import Messages from "~/components/messages.svelte";
import RecaptchaV2 from "~/components/recaptcha-v2.svelte";
import {
  LoginDocument, MeDocument
} from "~/graphql/types";
import type {
  LoginMutationVariables, LoginMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";

let password: string;
let username: string;
let recaptcha: RecaptchaV2;
let messages: Record<string, string[]> = {};

const mutate = mutation<LoginMutation, LoginMutationVariables>(LoginDocument);

const login = async () => {

  try {

    await mutate({
      refetchQueries: [{ query: MeDocument }],
      variables: { input: {
        password,
        username
      } }
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
  />
  <InputText
    label="パスワード"
    type="password"
    bind:value={password}
    errorMessages={messages.password}
    autocomplete="current-password"
  />
  <RecaptchaV2 bind:this={recaptcha} />

  <Messages type="error" messages={messages.recaptcha} />
  <Messages type="error" messages={messages._} />

  <input on:click={login} type="submit" value="ログイン" />
</form>

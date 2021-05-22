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
import {
  isAllowed, meQuery
} from "~/lib/me";

let recaptcha: RecaptchaV2;
let password: string;
let username: string;
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

const mq = meQuery();
$: me = $mq?.data?.me;
</script>

{#if me && isAllowed(me, "login")}
  <InputText
    label="ユーザー名"
    bind:value={username}
    errorMessages={messages.username}
  />
  <InputText
    label="パスワード"
    type="password"
    bind:value={password}
    errorMessages={messages.password}
  />
  <RecaptchaV2 bind:this={recaptcha} />

  <Messages type="error" messages={messages.recaptcha} />
  <Messages type="error" messages={messages._} />

  <button on:click={login}>ログイン</button>
{/if}

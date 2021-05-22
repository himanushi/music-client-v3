<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import InputText from "~/components/input-text.svelte";
import Messages from "~/components/messages.svelte";
import RecaptchaV2 from "~/components/recaptcha-v2.svelte";
import { LoginDocument } from "~/graphql/types";
import type {
  LoginMutationVariables, LoginMutation
} from "~/graphql/types";
import { errorInputs } from "~/lib/input";
import {
  isAllowed, meQuery
} from "~/lib/me";

let recaptcha: RecaptchaV2;
let password: string;
let username: string;
let warnings: Record<string, string[]> = {};

const mutate = mutation<LoginMutation, LoginMutationVariables>(LoginDocument);

const login = async () => {

  try {

    await mutate({ variables: { input: {
      password,
      username
    } } });

    $goto("/me");

  } catch (error) {

    if (error instanceof ApolloError) {

      warnings = errorInputs(error);
      recaptcha.reset();

    }

  }

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "login")}
  <InputText
    label="ユーザー名"
    bind:value={username}
    errorMessages={warnings.username}
  />
  <InputText
    label="パスワード"
    type="password"
    bind:value={password}
    errorMessages={warnings.password}
  />
  <RecaptchaV2 bind:this={recaptcha} />

  {#if warnings._}
    <Messages messages={warnings._} />
  {/if}
  <button on:click={login}>ログイン</button>
{/if}

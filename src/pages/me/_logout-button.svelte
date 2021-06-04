<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import Messages from "~/components/messages.svelte";
import {
  LogoutDocument, MeDocument
} from "~/graphql/types";
import type {
  LogoutMutationVariables, LogoutMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";

let messages: Record<string, string[]> = {};

const mutate =
  mutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);

const logout = async () => {

  try {

    await mutate({
      refetchQueries: [{ query: MeDocument }],
      variables: { input: {} }
    });

    $goto("/me");

  } catch (error) {

    if (error instanceof ApolloError) {

      messages = errorMessages(error);

    }

  }

};
</script>

<Messages type="error" messages={messages._} />
<button on:click={logout}>ログアウト</button>

<style lang="scss">
button {
  @apply rounded p-2;
  @apply bg-red-700 hover_bg-red-600 active_bg-red-500 text-black;
}
</style>

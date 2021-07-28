<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import Button from "~/components/button.svelte";
import InputCheckbox from "~/components/input-checkbox.svelte";
import Separate from "~/components/separate.svelte";
import Message from "~/components/toast-messages/message.svelte";
import { toasts } from "~/components/toasts.svelte";
import { CreateRadioDocument } from "~/graphql/types";
import type {
  Radio,
  CreateRadioMutationVariables,
  CreateRadioMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";

export let id: string;
let random = false;
let messages: Record<string, string[]> = {};
let disabled = false;

const mutate =
  mutation<CreateRadioMutation, CreateRadioMutationVariables>(
    CreateRadioDocument
  );

const live = async () => {

  disabled = true;

  try {

    const result = await mutate({ variables: { input: {
      playlistId: id,
      random
    } } });

    const radio = result?.data?.createRadio?.radio as Radio;

    toasts.open({
      closeMs: 3000,
      component: Message,
      props: {
        text: "ラジオの放送を開始しました",
        type: "success"
      }
    });

    $goto("/radios/:id", { id: radio.id });

  } catch (error) {

    disabled = false;

    if (error instanceof ApolloError) {

      messages = errorMessages(error);

    }

  }

};
</script>

<form on:submit|preventDefault>
  <Separate text="Radio" />

  <InputCheckbox
    label="ランダム放送"
    bind:checked={random}
    errorMessages={messages.random}
  />

  <Button class="text-center" {disabled} on:click={live} messages={messages._}>
    放送開始
  </Button>
</form>

<style lang="scss">
form {
  @apply text-white flex flex-col items-center space-y-5 py-2;
}
</style>

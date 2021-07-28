<script lang="ts">
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import type { Props } from "~/components/confirm.svelte";
import Confirm from "~/components/confirm.svelte";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import Message from "~/components/toast-messages/message.svelte";
import { toasts } from "~/components/toasts.svelte";
import type {
  Playlist,
  DeleteRadioMutation,
  DeleteRadioMutationVariables
} from "~/graphql/types";
import { DeleteRadioDocument } from "~/graphql/types";
import Trash from "~/icons/trash.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import { playerService } from "~/machines/jukebox-machine";

export let id: string;

const deleteRadio =
  mutation<DeleteRadioMutation, DeleteRadioMutationVariables>(
    DeleteRadioDocument
  );

const remove = () => {

  modals.open<Props>({
    component: Confirm,
    props: {
      noClick: () => modals.close(),
      title: "削除しますか？",
      yesClick: async () => {

        try {

          const result = await deleteRadio({ variables: { input: { radioId: id } } });
          const playlist = result?.data?.deleteRadio?.playlist as Playlist;

          toasts.open({
            closeMs: 5000,
            component: Message,
            props: {
              text: "ラジオを削除しました",
              type: "success"
            }
          });

          modals.close();
          $goto("/playlist/:id", { id: playlist.id });

        } catch (error) {

          toasts.open({
            closeMs: 5000,
            component: Message,
            props: {
              text: "エラーが発生しました",
              type: "error"
            }
          });

          modals.close();

        }

      }
    }
  });

};

let className = "bottom-4";

$: if ($playerService.context.currentTrack) {

  className = "bottom-20";

}

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "deleteRadio")}
  <span class={className} on:click={remove}>
    <IconButton class="w-14 h-14">
      <Trash class="w-8 h-8" />
    </IconButton>
  </span>
{/if}

<style lang="scss">
span {
  @apply fixed right-5;
  @apply flex items-center justify-center;
  @apply h-14 w-14 rounded-full bg-red-400;
  @apply shadow;
}
</style>

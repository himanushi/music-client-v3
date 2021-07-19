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
  DeletePlaylistMutation,
  DeletePlaylistMutationVariables
} from "~/graphql/types";
import { DeletePlaylistDocument } from "~/graphql/types";
import Trash from "~/icons/trash.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import { playerService } from "~/machines/jukebox-machine";

export let id: string;

const deletePlaylist = mutation<
  DeletePlaylistMutation,
  DeletePlaylistMutationVariables
>(DeletePlaylistDocument);

const remove = () => {

  modals.open<Props>({
    component: Confirm,
    props: {
      noClick: () => modals.close(),
      title: "削除しますか？",
      yesClick: async () => {

        try {

          await deletePlaylist({ variables: { input: { playlistId: id } } });

          toasts.open({
            closeMs: 5000,
            component: Message,
            props: {
              text: "プレイリストを削除しました",
              type: "success"
            }
          });

        } catch (error) {

          toasts.open({
            closeMs: 5000,
            component: Message,
            props: {
              text: "エラーが発生しました",
              type: "error"
            }
          });

        }

        modals.close();
        $goto("/playlist", { pm: "1" });

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

{#if me && isAllowed(me, "deletePlaylist")}
  <span class={className} on:click={remove}>
    <IconButton class="w-6 h-6">
      <Trash class="w-6 h-6" />
    </IconButton>
  </span>
{/if}

<style lang="scss">
span {
  @apply fixed right-24;
  @apply flex items-center justify-center;
  @apply h-10 w-10 rounded-full bg-red-400;
  @apply shadow;
}
</style>

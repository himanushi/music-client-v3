<script lang="ts">
import Message from "./toast-messages/message.svelte";
import { toasts } from "./toasts.svelte";
import type { Track } from "~/graphql/types";
import { accountService } from "~/machines/spotify-account-machine";
import { service } from "~/machines/spotify-create-playlist";

export let name: string;
export let description: string;
export let tracks: Track[];

const addPlaylist = () => {

  service.send({
    description,
    name,
    tracks,
    type: "CREATE"
  });

};

$: if ($service.matches("done")) {

  toasts.open({
    closeMs: 5000,
    component: Message,
    props: {
      text: "Spotify にプレイリストを追加しました。",
      type: "success"
    }
  });

} else if ($service.matches("error")) {

  toasts.open({
    closeMs: 5000,
    component: Message,
    props: {
      text: "エラーが発生しました。",
      type: "error"
    }
  });

}
</script>

{#if tracks.length > 0 && accountService && $accountService.matches("authorized")}
  <button on:click={addPlaylist}>Spotify に追加</button>
{/if}

<style lang="scss">
button {
  @apply rounded p-2;
  @apply bg-green-500 hover_bg-green-400 active_bg-green-300;
}
</style>

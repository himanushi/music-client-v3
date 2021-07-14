<script lang="ts">
import SettingAppleMusicButton from "./setting-apple-music-button.svelte";
import Message from "~/components/toast-messages/message.svelte";
import { toasts } from "~/components/toasts.svelte";
import type { Track } from "~/graphql/types";
import { accountService } from "~/machines/apple-music-account-machine";
import { service } from "~/machines/apple-music-create-playlist";

export let name: string;
export let description: string;
export let tracks: Track[];
let disabled = false;

const addPlaylist = () => {

  disabled = true;

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
      text: "Apple Music にプレイリストを追加しました。",
      type: "success"
    }
  });

  disabled = false;

} else if ($service.matches("error")) {

  toasts.open({
    closeMs: 5000,
    component: Message,
    props: {
      text: "エラーが発生しました。",
      type: "error"
    }
  });

  disabled = false;

}
</script>

{#if tracks.length > 0 && accountService && $accountService.matches("authorized")}
  <button {disabled} on:click={addPlaylist}>
    {disabled ? "追加中..." : "Apple Music に追加"}
  </button>
{/if}

<SettingAppleMusicButton />

<style lang="scss">
button {
  @apply rounded p-2;
  @apply bg-pink-500 hover_bg-pink-400 active_bg-pink-300;
  @apply text-white;
}
</style>

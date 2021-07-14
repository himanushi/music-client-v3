<script lang="ts">
import { goto } from "@roxi/routify";
import { accountService } from "~/machines/apple-music-account-machine";
</script>

{#if accountService && $accountService.matches("unauthorized")}
  <button on:click={() => $goto("/me")}> Apple Music 設定へ </button>
{/if}

<style lang="scss">
button {
  @apply rounded p-2 w-44 text-center;
  @apply bg-pink-500 hover_bg-pink-400 active_bg-pink-300;
  @apply text-white;
}
</style>

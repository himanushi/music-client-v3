<script lang="ts">
import { accountService } from "~/machines/apple-music-account-machine";

let token = "";
if (import.meta.env.SNOWPACK_PUBLIC_APPLE_AFFILIATE_TOKEN) {

  token = `?at=${import.meta.env.SNOWPACK_PUBLIC_APPLE_AFFILIATE_TOKEN}`;

}
</script>

{#if accountService && $accountService.matches("unauthorized")}
  <a target="_blank" href={`https://music.apple.com/jp${token}`}>
    Apple Music に加入
  </a>
{/if}

<style lang="scss">
a {
  @apply rounded p-2;
  @apply bg-red-500 hover_bg-red-400 active_bg-red-300;
  @apply text-black;
}
</style>

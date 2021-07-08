<script lang="ts">
import { appleAffiliateToken } from "~/lib/variable";

import { accountService } from "~/machines/apple-music-account-machine";

let token = "";
if (appleAffiliateToken) {

  token = `?at=${appleAffiliateToken}`;

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

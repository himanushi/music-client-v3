<script lang="ts">
import { appleAffiliateToken } from "~/lib/variable";

import { accountService } from "~/machines/apple-music-account-machine";

let token = "";
if (appleAffiliateToken) {

  token = `&at=${appleAffiliateToken}`;

}
</script>

{#if accountService && $accountService.matches("unauthorized")}
  <a
    target="_blank"
    href={`https://music.apple.com/deeplink?app=music&p=subscribe${token}`}
  >
    Apple Music に加入
  </a>
{/if}

<style lang="scss">
a {
  @apply rounded p-2;
  @apply bg-pink-500 hover_bg-pink-400 active_bg-pink-300;
  @apply text-white;
}
</style>

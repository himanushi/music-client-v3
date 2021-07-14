<script lang="ts">
import { appleAffiliateToken } from "~/lib/variable";
import { accountService } from "~/machines/apple-music-account-machine";

let token = "";
if (appleAffiliateToken) {

  token = `&at=${appleAffiliateToken}`;

}

let href = "";

if ((/Mac|iPhone|iPod|iPad|Win/iu).test(navigator.platform)) {

  href = `itmss://music.apple.com/deeplink?app=music&p=subscribe${token}`;

} else if ((/Android/iu).test(navigator.platform)) {

  href = `https://music.apple.com/deeplink?app=music&p=subscribe${token}`;

} else {

  href = `https://music.apple.com/jp/browse?app=music&p=subscribe${token}`;

}
</script>

{#if accountService && $accountService.matches("unauthorized")}
  <a target="_blank" {href}> Apple Music に加入 </a>
{/if}

<style lang="scss">
a {
  @apply rounded p-2;
  @apply bg-pink-500 hover_bg-pink-400 active_bg-pink-300;
  @apply text-white;
}
</style>

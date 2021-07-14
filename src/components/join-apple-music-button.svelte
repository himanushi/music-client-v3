<script lang="ts">
import isMobile from "ismobilejs";
import { appleAffiliateToken } from "~/lib/variable";
import { accountService } from "~/machines/apple-music-account-machine";

let token = "";
if (appleAffiliateToken) {

  token = `&at=${appleAffiliateToken}`;

}

let href = "";

if (isMobile(window.navigator).apple.device) {

  href = `musics://music.apple.com/deeplink?app=music&p=subscribe${token}`;

} else if ((/Mac|Win/iu).test(navigator.platform)) {

  href = `itmss://music.apple.com/deeplink?app=music&p=subscribe${token}`;

} else if (isMobile(window.navigator).android.device) {

  href = `https://music.apple.com/deeplink?app=music&p=subscribe${token}`;

} else {

  href = `https://music.apple.com/jp/browse?app=music&p=subscribe${token}`;

}
</script>

{#if accountService && $accountService.matches("unauthorized")}
  <a class="apple" target="_blank" {href}> Apple Music に加入 </a>
{/if}

<style lang="scss">
a {
  @apply rounded p-2 w-44 text-center;
  @apply bg-pink-500 hover_bg-pink-400 active_bg-pink-300;
  @apply text-white;
}
</style>

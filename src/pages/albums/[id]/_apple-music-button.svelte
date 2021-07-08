<script lang="ts">
import { url } from "@roxi/routify";
import { appleAffiliateToken } from "~/lib/variable";

export let id: string;

let token = "";
if (appleAffiliateToken) {

  token = `&at=${appleAffiliateToken}`;

}
</script>

<div>
  <a
    href={$url(`https://music.apple.com/jp/album/${id}?app=music${token}`)}
    target="_blank"
  >
    Apple Music で聴く
  </a>
</div>

<style lang="scss">
div {
  @apply p-2;
  a {
    @apply rounded p-2;
    @apply bg-pink-500 hover_bg-pink-400 active_bg-pink-300;
    @apply text-white;
  }
}
</style>

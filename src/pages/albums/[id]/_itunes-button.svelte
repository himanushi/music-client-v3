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
    href={$url(`itmss://music.apple.com/jp/album/${id}?app=itunes${token}`)}
    target="_blank"
  >
    iTunes で聴く
  </a>
</div>

<style lang="scss">
div {
  @apply p-2;
  a {
    @apply rounded p-2;
    @apply bg-blue-500 hover_bg-blue-400 active_bg-blue-300;
  }
}
</style>

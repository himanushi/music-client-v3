<script lang="ts">
import { url } from "@roxi/routify";
import { appleAffiliateToken } from "~/lib/variable";

export let id: string;

let token = "";
if (appleAffiliateToken) {

  token = `&at=${appleAffiliateToken}`;

}
</script>

<a
  href={$url(`itmss://music.apple.com/jp/album/${id}?app=music${token}`)}
  target="_blank"
>
  iTunes で聴く
</a>

<style lang="scss">
a {
  @apply rounded p-2;
  @apply bg-blue-500 hover_bg-blue-400 active_bg-blue-300;
}
</style>

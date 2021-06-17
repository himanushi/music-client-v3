<script lang="ts">
import { url } from "@roxi/routify";
import LogoutButton from "./_logout-button.svelte";
import InfoMessage from "~/components/info-message.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

$: query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "updateMe") && me.registered}
  <a href={$url("/me/edit")}>設定を変更する</a>
{/if}

{#if me && isAllowed(me, "logout") && me.registered}
  <LogoutButton />
{:else if me && isAllowed(me, "login")}
  <a href={$url("/me/login")}>ログイン</a>
  <a href={$url("/me/signup")}>登録する</a>
  <InfoMessage class="mx-12  text-gray-300" size="s">
    ログインすると、お気に入り登録、曲検索、プレイリスト作成と公開などが出来るようになります。
  </InfoMessage>
{/if}

<style lang="scss">
a {
  @apply rounded p-2;
  @apply bg-teal-500 hover_bg-teal-400 active_bg-teal-300 text-black;
}
</style>

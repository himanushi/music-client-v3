<script lang="ts">
import { goto } from "@roxi/routify";
import { fly } from "svelte/transition";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import Player from "~/components/player.svelte";
import ChevronLeft from "~/icons/chevron-left.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

const close = () => modals.close();

const showPlayer = () => modals.open(Player);

const go =
  (path: string, params: Record<string, string> = {}) => () => {

    $goto(path, params);
    modals.close();

  };

const query = meQuery();
$: me = $query?.data?.me;
</script>

<nav
  on:click|stopPropagation
  transition:fly={{
    duration: 200,
    opacity: 100,
    x: -288
  }}
>
  <header>
    <IconButton class="h-10 w-10" on:click={close}>
      <ChevronLeft class="text-black h-5 w-5" />
    </IconButton>
    <h4>メニュー</h4>
  </header>
  <main>
    <section>
      <h5>検索</h5>
      <ul>
        {#if me && isAllowed(me, "artists")}
          <li class="clickable" on:click={go("/artists")}>アーティスト</li>
        {/if}
        {#if me && isAllowed(me, "albums")}
          <li class="clickable" on:click={go("/albums")}>アルバム</li>
        {/if}
        {#if me && isAllowed(me, "tracks")}
          <li class="clickable" on:click={go("/tracks")}>曲</li>
        {/if}
        {#if me && isAllowed(me, "playlists")}
          <li class="clickable" on:click={go("/playlist")}>プレイリスト</li>
        {/if}
        {#if me && isAllowed(me, [
"playlists",
"upsertPlaylist",
"addPlaylistItems"
])}
          <li class="clickable" on:click={go("/playlist", { pm: "1" })}>
            マイプレイリスト
          </li>
        {/if}
        <li class="clickable" on:click={go("/me")}>設定</li>
        <li class="clickable" on:click={showPlayer}>音楽プレイヤー</li>
        <li class="clickable" on:click={go("/about")}>このサイトについて</li>
        <li class="clickable" on:click={go("/terms")}>利用規約</li>
        <li class="clickable" on:click={go("/privacy")}>
          プレイバシーポリシー
        </li>
        <li class="clickable" on:click={go("/cookie-policy")}>
          クッキーポリシー
        </li>
      </ul>
    </section>
  </main>
</nav>

<style lang="scss">
nav {
  /* サイズ */
  @apply w-72 h-full;
  /* 透過 */
  @apply bg-opacity-100;

  header {
    @apply h-16 flex items-center bg-teal-500 px-2;

    h4 {
      /* 位置 */
      /* フォント */
      @apply text-black text-lg;
    }
  }

  main {
    @apply bg-gray-900 text-white h-full;
  }
}
</style>

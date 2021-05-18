<script lang="ts">
import { goto } from "@roxi/routify";
import { fly } from "svelte/transition";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import Player from "~/components/player.svelte";
import ChevronLeft from "~/icons/chevron-left.svelte";

const close = () => modals.close();

const go = (path: string, params: Record<string, string> = {}) => () => {

  $goto(path, params);
  modals.close();

};

const showPlayer = () => modals.open(Player);
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
      <ChevronLeft color="text-black" size="h-5 w-5" />
    </IconButton>
    <h4>メニュー</h4>
  </header>
  <main>
    <section>
      <h5>検索</h5>
      <ul>
        <li class="clickable" on:click={go("/artists")}>アーティスト</li>
        <li class="clickable" on:click={go("/albums")}>アルバム</li>
        <li class="clickable" on:click={go("/tracks")}>曲</li>
        <li class="clickable" on:click={go("/playlist")}>プレイリスト</li>
        <li class="clickable" on:click={go("/playlist", { pm: "1" })}>
          マイプレイリスト
        </li>
        <li class="clickable" on:click={go("/me")}>設定</li>
        <li class="clickable" on:click={showPlayer}>音楽プレイヤー</li>
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

<script lang="ts">
import { goto } from "@roxi/routify";
import { fly } from "svelte/transition";
import IconButton from "~/components/icon-button.svelte";
import { modal } from "~/components/modal.svelte";
import ChevronLeft from "~/icons/chevron-left.svelte";

const close = () => modal.set(null);
const go = (path: string) => () => {

  $goto(path);
  modal.set(null);

};
</script>

<nav
  on:click|stopPropagation
  transition:fly={{
    "duration": 300,
    "opacity": 100,
    "x": -288
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
        <li class="clickable" on:click={go("/artists")}>アーティスト検索</li>
        <li class="clickable" on:click={go("/albums")}>アルバム検索</li>
        <li class="clickable" on:click={go("/playlist")}>プレイリスト検索</li>
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

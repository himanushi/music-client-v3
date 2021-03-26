<script lang="ts">
  import { goto } from "@roxi/routify";
  import { fly } from "svelte/transition";
  import IconButton from "~/components/icon-button.svelte";
  import ChevronLeft from "~/icons/chevron-left.svelte";
  import { sidebarHidden } from "~/store/page";

  const hiddenSidebar = () => sidebarHidden.set(true);
  const go = (path: string) => () => {

    $goto(path);
    sidebarHidden.set(true);

  };
</script>

{#if !$sidebarHidden}
  <div on:click={hiddenSidebar}>
    <nav
      on:click|stopPropagation
      transition:fly={{
        "duration": 300,
        "x": -288
      }}
    >
      <header>
        <IconButton size={10} on:click={hiddenSidebar}>
          <ChevronLeft color="black" size={5} />
        </IconButton>
        <h4>メニュー</h4>
      </header>
      <main>
        <section>
          <h5>検索</h5>
          <ul>
            <li class="clickable" on:click={go("/albums")}>アーティスト検索</li>
            <li class="clickable" on:click={go("/albums")}>アルバム検索</li>
          </ul>
        </section>
      </main>
    </nav>
  </div>
{/if}

<style lang="scss">
  div {
    /* 位置 */
    @apply absolute w-full h-full z-50;
    /* 透過 */
    @apply bg-black bg-opacity-30;

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
  }
</style>

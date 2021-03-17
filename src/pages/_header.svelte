<script lang="ts">
  import { url } from "@roxi/routify";
  import IconButton from "~/components/icon-button.svelte";
  import MenuIcon from "~/icons/menu.svelte";
  import UserIcon from "~/icons/user.svelte";
  import { sidebarHidden } from "~/store/page";

  const showSidebar = () => sidebarHidden.set(false);
</script>

<header>
  <IconButton on:click={showSidebar}>
    <MenuIcon size={7} />
  </IconButton>

  <h1>
    <a href={$url("./albums")} class="clickable">ゲーム音楽</a>
  </h1>

  <IconButton>
    <UserIcon size={9} />
  </IconButton>
</header>

<style lang="scss">
  header {
    /* 子要素の並び */
    @apply flex flex-row items-center p-3;
    /* color */
    @apply bg-gray-900 text-white;

    :global(button) {
      /* サイズ固定 */
      @apply flex-shrink-0;
    }
  }

  h1 {
    /* フォント */
    @apply text-lg;
    /* サイズ */
    @apply flex-1;

    a {
      /* 形 */
      @apply rounded p-2;
    }
  }
</style>

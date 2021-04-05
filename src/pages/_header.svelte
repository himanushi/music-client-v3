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
    @apply bg-blue-800;
  }
  /* デザインはあとで */
</style>

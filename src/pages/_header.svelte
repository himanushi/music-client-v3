<script lang="ts">
import { url } from "@roxi/routify";
import Sidebar from "./_sidebar.svelte";
import IconButton from "~/components/icon-button.svelte";
import { modal } from "~/components/modal.svelte";
import MenuIcon from "~/icons/menu.svelte";
import UserIcon from "~/icons/user.svelte";

const showSidebar = () => modal.set(Sidebar);
</script>

<header>
  <IconButton on:click={showSidebar}>
    <MenuIcon size="h-7 w-7" />
  </IconButton>

  <h1>
    <a href={$url("./albums")} class="clickable">ゲーム音楽</a>
  </h1>

  <IconButton>
    <UserIcon size="h-9 w-9" />
  </IconButton>
</header>

<style lang="scss">
header {
  @apply bg-blue-800;
}
/* デザインはあとで */
</style>

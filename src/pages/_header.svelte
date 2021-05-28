<script lang="ts">
import { url } from "@roxi/routify";
import Sidebar from "./_sidebar.svelte";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import MenuIcon from "~/icons/menu.svelte";

const showSidebar = () => modals.open(Sidebar);
</script>

<header>
  <IconButton on:click={showSidebar}>
    <MenuIcon class="h-7 w-7" />
  </IconButton>

  <h1>
    <a href={$url("./albums")} class="clickable">ゲーム音楽</a>
  </h1>
</header>

<style lang="scss">
header {
  @apply bg-blue-800;
}
/* デザインはあとで */
</style>

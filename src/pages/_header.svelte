<script lang="ts">
  import { url } from "@roxi/routify";
  import IconButton from "~/components/icon-button.svelte";
  import MenuIcon from "~/icons/menu.svelte";
  import UserIcon from "~/icons/user.svelte";
  import { sidebarHidden } from "~/store/page";

  const showSidebar = () => sidebarHidden.set(false);
</script>

<header />

<style lang="scss">
  header {
    /* color */
    @apply bg-gray-900 text-white;
    /* size */
    @apply h-16 p-2 block;
  }
</style>

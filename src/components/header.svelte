<script lang="ts">
  import IconButton from "~/components/icon-button.svelte";
  import MenuIcon from "~/icons/menu.svelte";
  import UserIcon from "~/icons/user.svelte";
</script>

<header>
  <div class="menu">
    <IconButton>
      <MenuIcon size={7} />
    </IconButton>
  </div>

  <h1 class="title">
    <a>ゲーム音楽</a>
  </h1>

  <div class="user">
    <IconButton>
      <UserIcon size={9} />
    </IconButton>
  </div>
</header>

<style>
  header {
    @apply bg-gray-900 text-white;
    /* @apply fixed inset-x-0 top-0; */
    @apply flex flex-row items-center p-3;
  }

  .title {
    @apply text-center text-lg;
    @apply flex-1;
  }

  .menu {
    @apply flex-shrink-0;
  }

  .user {
    @apply flex-shrink-0;
  }
</style>

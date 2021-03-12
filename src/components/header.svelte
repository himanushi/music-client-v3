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
    @apply fixed inset-x-0 top-0 py-3;

    @apply grid grid-cols-5 items-center;
  }

  .title {
    @apply text-center text-lg;
    @apply ml-0 text-center col-span-3;
  }

  .menu {
    @apply px-1;
  }

  .user {
    @apply px-1 flex justify-end;
  }
</style>

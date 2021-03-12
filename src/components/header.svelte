<script lang="ts">
  import IconButton from "~/components/icon-button.svelte";
  import MenuIcon from "~/icons/menu.svelte";
  import UserIcon from "~/icons/user.svelte";
</script>

<header>
  <div class="menu">
    <IconButton>
      <MenuIcon />
    </IconButton>
  </div>

  <h1>
    <a>ゲーム音楽</a>
  </h1>

  <div class="user">
    <IconButton>
      <UserIcon />
    </IconButton>
  </div>
</header>

<style>
  header {
    @apply bg-gray-900 text-white;
    @apply fixed inset-x-0 top-0 py-2;

    @apply grid grid-cols-5 items-center;
  }

  /* title */
  h1 {
    @apply ml-0 text-center col-span-3;
  }

  .user {
    @apply flex justify-end;
  }
</style>

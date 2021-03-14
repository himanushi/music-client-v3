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
    /* 子要素の並び */
    @apply flex flex-row items-center p-3;
    /* color */
    @apply bg-gray-900 text-white;
  }

  .title {
    /* font setting */
    @apply text-center text-lg;
    /* サイズ */
    @apply flex-1;
  }

  .menu {
    /* サイズ */
    @apply flex-shrink-0;
  }

  .user {
    /* サイズ */
    @apply flex-shrink-0;
  }
</style>

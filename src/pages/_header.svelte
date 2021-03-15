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

  <div class="title">
    <h1 class="text-button">
      <a>ゲーム音楽</a>
    </h1>
  </div>

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
    /* フォント */
    @apply text-lg;
    /* サイズ */
    @apply flex-1;
  }

  h1 {
    @apply inline-block rounded;
  }

  .user,
  .menu {
    /* サイズ固定 */
    @apply flex-shrink-0;
  }
</style>

<header>
  <button class="menu">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>

  <button class="user">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
        clip-rule="evenodd"
      />
    </svg>
  </button>

  <h1>
    <a>ゲーム音楽</a>
  </h1>
</header>

<style>
  header {
    @apply bg-gray-700 text-white;
    @apply fixed inset-x-0 top-0 py-3;
  }

  /* title */
  h1 {
    @apply ml-0 text-center;
  }

  button {
    @apply absolute top-0 bottom-0 inline-block;
  }

  svg {
    @apply h-5 w-5 text-white;
  }

  /* menu */
  button.menu {
    @apply left-3;
  }

  /* user */
  button.user {
    @apply right-3;
  }
</style>

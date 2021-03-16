<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  html,
  body {
    @apply h-screen;
  }

  body {
    @apply bg-gray-800;
  }

  .clickable {
    /* color */
    @apply bg-white bg-opacity-0;
    /* animation */
    @apply transition duration-200;
    /* hover */
    @apply hover_bg-opacity-20 cursor-pointer;
    /* click */
    @apply active_bg-opacity-50;
  }
</style>

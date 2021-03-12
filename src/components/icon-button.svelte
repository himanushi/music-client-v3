<script lang="ts">
  export let size = 8;
</script>

<button class="h-{size} w-{size}">
  <slot><!-- icon --></slot>
</button>

<style>
  button {
    @apply flex items-center justify-center rounded-full;

    /* hover */
    @apply transition duration-200 hover_bg-gray-600;

    /* click */
    @apply active_bg-gray-500 focus_outline-none;
  }
</style>

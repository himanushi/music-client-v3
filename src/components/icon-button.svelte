<script lang="ts">
  export let size = 8;
</script>

<button class="h-{size} w-{size}">
  <slot><!-- icon --></slot>
</button>

<style>
  button {
    @apply flex items-center justify-center rounded-full bg-white bg-opacity-0;

    /* hover */
    @apply transition duration-200 hover_bg-opacity-20;

    /* click */
    @apply active_bg-opacity-50 focus_outline-none;
  }
</style>

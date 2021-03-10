<script lang="ts">
  export let name = "button";
</script>

<button class="btn focus">{name}</button>

<style>
  .btn {
    @apply py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg;
  }

  .focus {
    @apply focus_outline-none focus_ring-2 focus_ring-indigo-400 focus_ring-opacity-75;
  }
</style>

<script lang="ts">
// export let type: "info" | "warn" | "error" = "info";
export let messages: string[];
</script>

{#each messages as message}
  <p>{message}</p>
{/each}

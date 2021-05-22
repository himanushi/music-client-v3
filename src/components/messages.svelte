<script lang="ts">
export let type: "info" | "warn" | "error" = "info";
export let messages: string[] | undefined;
</script>

{#if messages}
  {#each messages as message}
    <p>{message}</p>
  {/each}
{/if}

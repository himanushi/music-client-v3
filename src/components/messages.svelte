<script lang="ts">
export let type: "info" | "warn" | "error" = "info";
export let messages: string[] | undefined;

let className = "";
export { className as class };

$: if (type === "info") {
  // 指定された色を表示
} else if (type === "warn") {

  className += " text-yellow-500";

} else if (type === "error") {

  className += " text-red-500";

}
</script>

{#if messages}
  {#each messages as message}
    <p class={className}>{message}</p>
  {/each}
{/if}

<style lang="scss">
p {
  @apply text-sm;
}
</style>

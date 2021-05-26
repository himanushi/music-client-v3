<script context="module">
type listType = {
  text: string;
  onClick: any;
};

export type selectionType = {
  lists: listType[];
};
</script>

<script lang="ts">
export let props: selectionType;
</script>

<ul>
  {#each props.lists as list}
    <li on:click={() => list.onClick()}>{list.text}</li>
  {/each}
</ul>

<style lang="scss">
ul {
  @apply bg-gray-700;
}
</style>

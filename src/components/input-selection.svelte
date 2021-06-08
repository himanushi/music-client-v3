<script lang="ts">
import { v4 as uuid } from "uuid";

let className = "";
export { className as class };

export let label: string;
export let value: string;
export let items: { value: string; label: string }[];

const id = uuid();
</script>

<div class={`input ${className}`}>
  <label for={id}>
    {label}
  </label>
  <select {id} bind:value>
    {#each items as item}
      <option value={item.value}>
        {item.label}
      </option>
    {/each}
  </select>
</div>

<style lang="scss">
.input {
  @apply flex flex-col;

  label {
    @apply mb-1;
  }

  select {
    @apply appearance-none border block w-auto rounded py-2 px-3 text-black leading-tight pr-9;
  }
}
</style>

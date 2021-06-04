<script>
import { v4 as uuid } from "uuid";
import Messages from "./messages.svelte";

export let label = "";
export let errorMessages: string[] | undefined = undefined;
export let checked: boolean;

const id = uuid();
</script>

<div class="input">
  <label for={id}>
    {label}
  </label>
  <input {id} type="checkbox" bind:checked />
  <div class="messages">
    <Messages type="error" messages={errorMessages} />
  </div>
</div>

<style lang="scss">
.input {
  @apply flex flex-row items-center;

  input {
    @apply rounded mx-1 text-teal-500 focus_outline-none;
  }
}
</style>

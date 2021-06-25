<script>
import { v4 as uuid } from "uuid";
import Messages from "./messages.svelte";

let className = "";
export { className as class };
export let placeholder = "";
export let label = "";
export let errorMessages: string[] | undefined = undefined;
export let value = "";
export let autocomplete:
  | "off"
  | "username"
  | "new-password"
  | "current-password" = "off";

const id = uuid();
</script>

<div class={`input ${className}`}>
  <label for={id}>
    {label}
  </label>
  <textarea {id} {autocomplete} bind:value {placeholder} />
  <div class="messages">
    <Messages type="error" messages={errorMessages} />
  </div>
</div>

<style lang="scss">
.input {
  @apply flex flex-col;

  label {
    @apply mb-1;
  }

  textarea {
    @apply h-full appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
    @apply focus_border-teal-500;
  }
}
</style>

<script>
import { v4 as uuid } from "uuid";
import Messages from "./messages.svelte";

let className = "";
export { className as class };

// ref: https://stackoverflow.com/questions/57392773/error-type-attribute-cannot-be-dynamic-if-input-uses-two-way-binding
export let placeholder = "";
export let label = "";
export let errorMessages: string[] | undefined = undefined;
export let value = "";
export let type = "text";
export let autocomplete:
  | "off"
  | "username"
  | "new-password"
  | "current-password" = "off";

const handleInput = (event: any) => {

  value = type.match(/^(?<value>number|range)$/u) ? Number(event.target.value) : event.target.value;

};

const id = uuid();
</script>

<div class={`input ${className}`}>
  <label for={id}>
    {label}
  </label>
  <input
    {id}
    {autocomplete}
    {type}
    {value}
    {placeholder}
    on:input={handleInput}
  />
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

  input {
    @apply appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
    @apply focus_border-teal-500;
  }
}
</style>

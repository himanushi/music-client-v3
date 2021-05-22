<script>
import Messages from "./messages.svelte";

// ref: https://stackoverflow.com/questions/57392773/error-type-attribute-cannot-be-dynamic-if-input-uses-two-way-binding
export let placeholder = "";
export let label = "";
export let errorMessages: string[] | undefined = undefined;
export let value = "";
export let type = "text";

const handleInput = (event: any) => {

  value = type.match(/^(?<value>number|range)$/u) ? Number(event.target.value) : event.target.value;

};
</script>

<div>
  <label>
    {label}
    <input {type} {value} {placeholder} on:input={handleInput} />
  </label>
  <Messages type="error" messages={errorMessages} />
</div>

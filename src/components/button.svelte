<script lang="ts">
import Messages from "./messages.svelte";

let className = "";
export { className as class };
export let messages: string[] | undefined = undefined;
export let disabled = false;
</script>

<div class={className}>
  <Messages type="error" {messages} />
  <button {disabled} on:click><slot /></button>
</div>

<style lang="scss">
button {
  @apply p-2 rounded;
  @apply bg-teal-500 focus_bg-teal-400 active_bg-teal-300 disabled_bg-gray-600 disabled_cursor-not-allowed;
}
</style>

<script lang="ts">
import Messages from "./messages.svelte";

export let messages: string[] | undefined;
</script>

<Messages type="error" {messages} />
<button on:click><slot /></button>

<style lang="scss">
button {
  @apply p-2 rounded;
  @apply bg-teal-500 focus_bg-teal-400 active_bg-teal-300;
}
</style>

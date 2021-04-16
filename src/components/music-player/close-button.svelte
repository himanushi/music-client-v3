<script lang="ts">
import { modal } from "../modal.svelte";

const close = () => modal.set(null);
</script>

<button on:click={close} class="close">x</button>

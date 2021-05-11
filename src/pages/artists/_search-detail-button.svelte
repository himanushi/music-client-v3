<script lang="ts">
import SearchDetail from "./_search-detail.svelte";
import { modal } from "~/components/modal.svelte";

const showModal = () => modal.set(SearchDetail);
</script>

<button on:click={showModal}>...</button>

<script lang="ts">
import SearchDetail from "./_search-detail.svelte";
import { modals } from "~/components/modals.svelte";

const showModal = () => modals.open(SearchDetail);
</script>

<button on:click={showModal}>...</button>

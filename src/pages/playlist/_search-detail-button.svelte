<script lang="ts">
import SearchDetail from "./_search-detail.svelte";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import Search from "~/icons/search.svelte";

const showModal = () => modals.open(SearchDetail);
</script>

<span on:click={showModal}>
  <IconButton class="w-10 h-10 mr-2">
    <Search class="w-10 h-10" />
  </IconButton>
</span>

<style lang="scss">
span {
  @apply fixed bottom-20 right-5;
  @apply flex items-center justify-center;
  @apply h-14 w-14 rounded-full bg-white;
  @apply shadow;
}
</style>

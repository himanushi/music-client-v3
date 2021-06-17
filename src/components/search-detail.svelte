<script lang="ts">
import { fly } from "svelte/transition";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import Text from "~/components/text.svelte";
import SearchIcon from "~/icons/search.svelte";

export let title: string;
export let onClick: () => void;

const click = () => {

  modals.close();
  onClick();

};
</script>

<div
  on:click|stopPropagation
  transition:fly={{
    duration: 400,
    opacity: 100,
    x: document.body.clientWidth
  }}
  class="modal"
>
  <form on:submit|preventDefault>
    <div class="separate">
      <Text class="text-white">{title}</Text>
    </div>
    <slot />
    <IconButton class="w-16 h-16" on:click={click}>
      <SearchIcon class="w-10 h-10 mr-2" />
    </IconButton>
  </form>
</div>

<style lang="scss">
.modal {
  @apply absolute inset-0 m-auto overflow-hidden;
  @apply bg-gray-800 rounded;
  @apply w-[300px];
  height: fit-content;

  .separate {
    @apply my-6 border-b-2 w-36 border-gray-500 text-lg text-center;
  }

  form {
    @apply flex flex-col items-center space-y-4 my-4 text-white;
  }
}
</style>

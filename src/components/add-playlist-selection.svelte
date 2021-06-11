<script context="module">
type listType = {
  text: string;
  onClick: any;
};

export type selectionType = {
  label: string;
  lists: listType[];
};
</script>

<script lang="ts">
import { fly } from "svelte/transition";
import IconButton from "./icon-button.svelte";
import { modals } from "./modals.svelte";
import Text from "./text.svelte";
import Close from "~/icons/close.svelte";

export let props: selectionType;

const close = () => modals.close();
</script>

<div
  on:click|stopPropagation
  transition:fly={{
    duration: 400,
    opacity: 100,
    y: document.body.clientHeight
  }}
  class="selection"
>
  <div class="title">
    <Text>{props.label}</Text>
  </div>
  <div class="list">
    <ul>
      {#each props.lists as list}
        <li>
          <div class="clickable item" on:click={() => list.onClick()}>
            <Text>
              {list.text}
            </Text>
          </div>
        </li>
      {/each}
    </ul>
  </div>
  <div class="buttons">
    <IconButton on:click={close} class="w-10 h-10">
      <Close class="w-10 h-10" />
    </IconButton>
  </div>
</div>

<style lang="scss">
.selection {
  @apply absolute inset-0 m-auto overflow-hidden py-2;
  @apply bg-gray-800 rounded;
  @apply h-[600px] w-[300px];
  @apply text-white;

  .title {
    @apply h-[10%] flex items-center justify-center text-lg;
  }

  .list {
    @apply h-[80%] overflow-y-scroll;

    ul {
      @apply h-[inherit] mt-2 my-2 mb-20 mx-4 divide-y divide-gray-700;

      li {
        .item {
          @apply rounded p-4;
        }
      }
    }
  }

  .buttons {
    @apply h-[10%] w-full grid grid-flow-col items-center justify-items-center;
  }
}
</style>

<script context="module">
export type ItemsType = {
  id: number;
  isDndShadowItem?: boolean;
  index: number;
  item: any;
}[];
</script>

<script lang="ts">
import { createEventDispatcher } from "svelte";
import {
  dndzone, SOURCES, TRIGGERS
} from "svelte-dnd-action";
import { flip } from "svelte/animate";
import Close from "~/icons/close.svelte";
import Menu from "~/icons/menu.svelte";

const dispatch = createEventDispatcher();

let className: string;
export let items: ItemsType;
export const flipDurationMs = 100;
export { className as class };

let dragDisabled = true;

const moving = (
  event: CustomEvent<DndEvent> & {
    target: EventTarget & HTMLElement;
  }
) => {

  const {
    items: newItems,
    info: {
      source, trigger
    }
  } = event.detail;

  dispatch("moving");

  items = newItems as ItemsType;

  if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {

    dragDisabled = true;

  }

};

const decide = (
  event: CustomEvent<DndEvent> & {
    target: EventTarget & HTMLElement;
  }
) => {

  const { info: { source } } = event.detail;

  let from = 0;
  let to = 0;

  const newItems = items.map((item, index) => {

    if (item.isDndShadowItem) {

      from = item.index;
      to = index;

    }

    return {
      id: item.id,
      index,
      item: item.item
    };

  });

  items = newItems;

  dispatch("decide", {
    from,
    items,
    to
  });

  if (source === SOURCES.POINTER) {

    dragDisabled = true;

  }

};

const startDrag = (event: Event) => {

  event.preventDefault();
  dragDisabled = false;

};

const remove = (index: number) => () => {

  items = items.
    filter((_, i1) => i1 !== index).
    map((item, i2) => ({
      id: item.id,
      index: i2,
      item: item.item
    }));

  dispatch("remove", {
    index,
    items
  });

};
</script>

<ul
  use:dndzone={{
    dragDisabled,
    dropTargetStyle: {},
    flipDurationMs,
    items
  }}
  on:consider={moving}
  on:finalize={decide}
  class={className}
>
  {#each items as item, index (item.id)}
    <li class="item clickable" animate:flip={{ duration: flipDurationMs }}>
      <span class="move" on:mousedown={startDrag} on:touchstart={startDrag}>
        <Menu class="h-7 w-7 text-white" />
      </span>
      <span class="content">
        <slot {item} {index} />
      </span>
      <span class="delete" on:click={remove(index)}>
        <Close class="h-7 w-7 text-red-400" />
      </span>
    </li>
  {/each}
</ul>

<style lang="scss">
ul {
  @apply h-auto p-2 overflow-y-scroll;
  @apply grid grid-flow-row;

  .item {
    @apply p-2 flex flex-row;
    @apply rounded items-center;

    .move {
      @apply flex-shrink-0;
    }

    .content {
      @apply flex-shrink w-full;
      @apply items-center;
    }

    .delete {
      @apply flex-shrink-0;
    }
  }
}
</style>

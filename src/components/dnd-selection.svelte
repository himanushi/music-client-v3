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

const dispatch = createEventDispatcher();

export let items: ItemsType;
export const flipDurationMs = 100;

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

<section
  use:dndzone={{
    dragDisabled,
    dropTargetStyle: {},
    flipDurationMs,
    items
  }}
  on:consider={moving}
  on:finalize={decide}
>
  {#each items as item, index (item.id)}
    <div animate:flip={{ duration: flipDurationMs }}>
      <div on:mousedown={startDrag} on:touchstart={startDrag}>三</div>
      <slot {item} {index} />
      <div on:click={remove(index)}>-</div>
    </div>
  {/each}
</section>

<style lang="scss">
section {
  @apply h-3/4 overflow-y-scroll;
}

div {
  @apply flex flex-row;
}
</style>

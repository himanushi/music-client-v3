<script lang="ts">
import { dndzone } from "svelte-dnd-action";
import { flip } from "svelte/animate";

let items: Record<string, any>[] = [
  {
    "id": 1,
    "name": "item1"
  },
  {
    "id": 2,
    "name": "item2"
  },
  {
    "id": 3,
    "name": "item3"
  },
  {
    "id": 4,
    "name": "item4"
  }
];
const flipDurationMs = 300;

const consider = (
  event: CustomEvent<DndEvent> & {
    target: EventTarget & HTMLElement;
  }
) => {

  ({ items } = event.detail);

};

const finalize = (
  event: CustomEvent<DndEvent> & {
    target: EventTarget & HTMLElement;
  }
) => {

  ({ items } = event.detail);

};
</script>

<section
  use:dndzone={{
    flipDurationMs,
    items
  }}
  on:consider={consider}
  on:finalize={finalize}
>
  {#each items as item (item.id)}
    <div animate:flip={{ "duration": flipDurationMs }}>{item.name}</div>
  {/each}
</section>

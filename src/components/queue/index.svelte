<script lang="ts">
import { dndzone } from "svelte-dnd-action";
import { flip } from "svelte/animate";
import Text from "../text.svelte";
import { playerService } from "~/machines/jukebox-machine";

$: playbackNo = $playerService.context.currentPlaybackNo;

let items: Record<string, any>[];
$: items = $playerService.context.tracks.map((track, index) => ({
  "id": index,
  track
}));

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
    "dropTargetStyle": {},
    flipDurationMs,
    items
  }}
  on:consider={consider}
  on:finalize={finalize}
>
  {#each items as item, index (item.id)}
    <div animate:flip={{ "duration": flipDurationMs }}>
      <Text>三</Text>
      {#if playbackNo === index}
        <Text>○</Text>
      {:else}
        <Text>|></Text>
      {/if}
      <Text>{item.track.name}</Text>
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

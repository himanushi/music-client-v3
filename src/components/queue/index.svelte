<script lang="ts">
import {
  dndzone, SOURCES, TRIGGERS
} from "svelte-dnd-action";
import { flip } from "svelte/animate";
import Text from "~/components/text.svelte";
import type { Track } from "~/graphql/types";
import { playerService } from "~/machines/jukebox-machine";

type ItemsType = {
  id: number;
  track: Track;
  isDndShadowItem?: boolean;
  index: number;
}[];

let items: ItemsType = $playerService.context.tracks.map((track, index) => ({
  id: index,
  index,
  track
}));

$: playbackNo = $playerService.context.currentPlaybackNo;

const flipDurationMs = 100;
let dragDisabled = true;

const consider = (
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

  items = newItems as ItemsType;

  if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {

    dragDisabled = true;

  }

};

const finalize = (
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
      track: item.track
    };

  });

  // player items との同期は見栄えがバグるのであえてしない
  playerService.send({
    from,
    to,
    type: "MOVE"
  });

  items = newItems;

  if (source === SOURCES.POINTER) {

    dragDisabled = true;

  }

};

const startDrag = (event: Event) => {

  event.preventDefault();
  dragDisabled = false;

};

const play = (currentPlaybackNo: number) => () => {

  playerService.send({
    currentPlaybackNo,
    type: "CHANGE_PLAYBACK_NO"
  });

};

const remove = (index: number) => () => {

  playerService.send({
    removeIndex: index,
    type: "REMOVE"
  });

  items = items.
    filter((_, i1) => i1 !== index).
    map((item, i2) => ({
      id: item.id,
      index: i2,
      track: item.track
    }));

};
</script>

<section
  use:dndzone={{
    dragDisabled,
    dropTargetStyle: {},
    flipDurationMs,
    items
  }}
  on:consider={consider}
  on:finalize={finalize}
>
  {#each items as item, index (item.id)}
    <div animate:flip={{ duration: flipDurationMs }}>
      <div on:mousedown={startDrag} on:touchstart={startDrag}>三</div>
      {#if playbackNo === index}
        <Text>○</Text>
      {:else}
        <div on:click={play(index)}>|></div>
      {/if}
      <Text>{item.track.name}</Text>
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

<script lang="ts">
import DndSelection from "~/components/dnd-selection.svelte";
import type { ItemsType } from "~/components/dnd-selection.svelte";
import Text from "~/components/text.svelte";
import { playerService } from "~/machines/jukebox-machine";

const items: ItemsType = $playerService.context.tracks.map((track, index) => ({
  id: index,
  index,
  item: track
}));

$: playbackNo = $playerService.context.currentPlaybackNo;

const decide = (
  event: CustomEvent & {
    detail: { from: number; to: number };
  }
) => {

  playerService.send({
    from: event.detail.from,
    to: event.detail.to,
    type: "MOVE"
  });

};

const play = (currentPlaybackNo: number) => () => {

  playerService.send({
    currentPlaybackNo,
    type: "CHANGE_PLAYBACK_NO"
  });

};

const remove = (
  event: CustomEvent & {
    detail: { index: number };
  }
) => {

  playerService.send({
    removeIndex: event.detail.index,
    type: "REMOVE"
  });

};
</script>

<DndSelection on:decide={decide} on:remove={remove} {items} let:index let:item>
  {#if playbackNo === index}
    <Text>○</Text>
  {:else}
    <div on:click={play(index)}>|></div>
  {/if}
  <Text>{item.item.name}</Text>
</DndSelection>

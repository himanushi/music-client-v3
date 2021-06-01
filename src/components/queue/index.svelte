<script lang="ts">
import IconButton from "../icon-button.svelte";
import DndSelection from "~/components/dnd-selection.svelte";
import type { ItemsType } from "~/components/dnd-selection.svelte";
import Text from "~/components/text.svelte";
import MusicNote from "~/icons/music-note.svelte";
import Play from "~/icons/play.svelte";
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

<div>
  <DndSelection
    on:decide={decide}
    on:remove={remove}
    {items}
    let:index
    let:item
    class={"h-[520px]"}
  >
    <span class="item">
      {#if playbackNo === index}
        <span class="icon">
          <MusicNote class="h-7 w-7 text-teal-400" />
        </span>
      {:else}
        <span class="icon" on:click={play(index)}>
          <IconButton class="h-7 w-7" on:click={play(index)}>
            <Play class="h-7 w-7 text-white" />
          </IconButton>
        </span>
      {/if}
      <span class="name">
        <Text class="text-white">{item.item.name}</Text>
      </span>
    </span>
  </DndSelection>
</div>

<style lang="scss">
.item {
  @apply flex flex-row items-center;

  .icon {
    @apply m-2;
  }
}
</style>

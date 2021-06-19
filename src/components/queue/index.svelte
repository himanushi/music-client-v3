<script lang="ts">
import { goto } from "@roxi/routify";
import IconButton from "../icon-button.svelte";
import { modals } from "../modals.svelte";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import DndSelection from "~/components/dnd-selection.svelte";
import type { ItemsType } from "~/components/dnd-selection.svelte";
import { canPlay } from "~/components/play-button.svelte";
import Text from "~/components/text.svelte";
import Link from "~/icons/link.svelte";
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

  canPlay.play();

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

const link = () => {

  modals.close();
  $goto($playerService.context.link);

};
</script>

<div>
  {#if playerService}
    <div class="title">
      <span class="name">
        <Text>
          {$playerService.context.name}
        </Text>
      </span>
      <span class="buttons">
        <IconButton on:click={link} class="h-7 w-7">
          <Link class="h-7 w-7" />
        </IconButton>
        <AddPlaylistButton
          class="w-7 h-7"
          tracks={$playerService.context.tracks}
        />
      </span>
    </div>
  {/if}
  <DndSelection
    on:decide={decide}
    on:remove={remove}
    {items}
    let:index
    let:item
    class={"max-h-[450px]"}
  >
    <span class="item">
      {#if playbackNo === index}
        <span class="icon">
          <MusicNote class="h-7 w-7 text-teal-400" />
        </span>
      {:else}
        <span class="icon" on:click={play(index)}>
          <IconButton
            disabled={!$canPlay}
            class="h-7 w-7"
            on:click={play(index)}
          >
            <Play class="h-7 w-7 text-white" />
          </IconButton>
        </span>
      {/if}
      <span>
        <Text class="text-white">{item.item.name}</Text>
      </span>
    </span>
  </DndSelection>
</div>

<style lang="scss">
.title {
  @apply flex flex-row justify-center;
  @apply my-4 w-full text-white text-base;

  .name {
    @apply w-7/12 truncate self-center;
  }

  .buttons {
    @apply ml-2 flex flex-row space-x-2;
  }
}

.item {
  @apply flex flex-row items-center;

  .icon {
    @apply m-2;
  }
}
</style>

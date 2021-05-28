<script lang="ts">
import AddPlaylistButton from "../add-playlist-button.svelte";
import Favorite from "../favorite.svelte";
import RepeatButton from "./repeat-button.svelte";
import IconButton from "~/components/icon-button.svelte";
import LoadingIcon from "~/icons/loading.svelte";
import PuaseIcon from "~/icons/pause.svelte";
import PlayIcon from "~/icons/play.svelte";
import RewindIcon from "~/icons/rewind.svelte";
import SkipIcon from "~/icons/skip.svelte";
import { playerService } from "~/machines/jukebox-machine";

$: player = $playerService.context.musicPlayerRef;

$: disabled = player && $player.value === "loading";

const playOrPause = () => {

  playerService.send("PLAY_OR_PAUSE");

};

const rewind = () => {

  playerService.send("PREVIOUS_PLAY");

};

const skip = () => {

  playerService.send("NEXT_PLAY");

};
</script>

<div>
  <div>
    <IconButton {disabled} on:click={rewind}>
      <RewindIcon class="text-white" />
    </IconButton>

    {#if player}
      <IconButton {disabled} class="h-16 w-16" on:click={playOrPause}>
        {#if $player.value === "playing"}
          <PuaseIcon class="text-white" />
        {:else if $player.value === "loading"}
          <LoadingIcon />
        {:else}
          <PlayIcon class="text-white w-20 h-20" />
        {/if}
      </IconButton>
    {/if}

    <IconButton {disabled} on:click={skip}>
      <SkipIcon class="text-white" />
    </IconButton>
  </div>

  <div>
    <RepeatButton />

    {#if player && $player.context.track}
      <Favorite type="track" id={$player.context.track.id} />
      <AddPlaylistButton tracks={[$player.context.track]} />
    {/if}
  </div>
</div>

<style lang="scss">
div {
  @apply flex flex-col items-center justify-center;

  div {
    @apply w-full flex flex-row items-center;
  }
}
</style>

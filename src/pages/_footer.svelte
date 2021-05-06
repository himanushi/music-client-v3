<script lang="ts">
import IconButton from "~/components/icon-button.svelte";
import { modal } from "~/components/modal.svelte";
import Player from "~/components/player.svelte";
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import PuaseIcon from "~/icons/pause.svelte";
import PlayIcon from "~/icons/play.svelte";
import LoadingIcon from "~/icons/refresh.svelte";
import SkipIcon from "~/icons/skip.svelte";
import { playerService } from "~/machines/jukebox-machine";

$: track = $playerService.context.currentTrack;
$: player = $playerService.context.musicPlayerRef;

const play_or_pause = () => {

  playerService.send("PLAY_OR_PAUSE");

};

const skip = () => {

  playerService.send("NEXT_PLAY");

};

const showPlayer = () => {

  modal.set(Player);

};
</script>

<footer>
  {#if track}
    {#key track.id}
      <div class="track-info">
        <div class="clickable" on:click={showPlayer}>
          <Image src={track.artworkM.url} class="h-10 w-10" />
          <span class="title">
            <Text>{track.name}</Text>
          </span>
        </div>
      </div>
    {/key}
  {/if}

  {#if player}
    <IconButton on:click={play_or_pause}>
      {#if $player.value === "playing"}
        <PuaseIcon color="text-gray-900" />
      {:else if $player.value === "loading"}
        <LoadingIcon color="text-gray-900" />
      {:else}
        <PlayIcon color="text-gray-900" />
      {/if}
    </IconButton>
  {/if}

  <IconButton on:click={skip}>
    <SkipIcon color="text-gray-900" />
  </IconButton>
</footer>

<style lang="scss">
/* デザインはあとで */
footer {
  @apply bg-green-800;
}
</style>

<script lang="ts">
import { fly } from "svelte/transition";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import Player from "~/components/player.svelte";
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import LoadingIcon from "~/icons/loading.svelte";
import PuaseIcon from "~/icons/pause.svelte";
import PlayIcon from "~/icons/play.svelte";
import SkipIcon from "~/icons/skip.svelte";
import { playerService } from "~/machines/jukebox-machine";

$: track = $playerService.context.currentTrack;
$: player = $playerService.context.musicPlayerRef;
$: disabled = player && $player.value === "loading";

const play_or_pause = () => {

  playerService.send("PLAY_OR_PAUSE");

};

const skip = () => {

  playerService.send("NEXT_PLAY");

};

const showPlayer = () => {

  modals.open(Player);

};
</script>

{#if track}
  <footer
    transition:fly={{
      duration: 200,
      opacity: 100,
      y: 56
    }}
  >
    {#key track.id}
      <span class="track-info clickable" on:click={showPlayer}>
        <span class="image">
          <Image src={track.artworkM.url} class="h-10 w-10" />
        </span>
        <span class="title">
          <Text>{track.name}</Text>
        </span>
      </span>

      <span class="buttons">
        {#if player}
          <IconButton {disabled} class="w-10 h-10" on:click={play_or_pause}>
            {#if $player.value === "playing"}
              <PuaseIcon class="text-gray-900 h-10 w-10" />
            {:else if $player.value === "loading"}
              <LoadingIcon />
            {:else}
              <PlayIcon class="text-gray-900 h-10 w-10" />
            {/if}
          </IconButton>

          <IconButton {disabled} class="w-10 h-10" on:click={skip}>
            <SkipIcon class="text-gray-900 h-10 w-10" />
          </IconButton>
        {/if}
      </span>
    {/key}
  </footer>
{/if}

<style lang="scss">
footer {
  @apply flex flex-row;
  @apply bg-teal-600;

  .track-info {
    @apply flex-1 w-0;
    @apply flex flex-row items-center;
    @apply rounded p-2;

    .image {
      @apply h-10 w-10 inline-block mr-2;
    }

    .title {
      @apply truncate;
    }
  }

  .buttons {
    @apply flex-shrink-0;
    @apply flex flex-row items-center;
  }
}
</style>

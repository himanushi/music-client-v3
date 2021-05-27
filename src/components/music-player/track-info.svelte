<script lang="ts">
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import type { Track } from "~/graphql/types";
import { playerService } from "~/machines/jukebox-machine";

let currentTrack: Track | undefined;
let name: string | undefined;

$: ({
  currentTrack, name
} = $playerService.context);
</script>

{#if currentTrack && name}
  {#key currentTrack.id}
    <div class="track-info">
      <div class="title">
        <Text>{name}</Text>
      </div>
      <div class="image">
        <Image src={currentTrack.artworkM.url} class="w-60 h-60" />
      </div>
      <div class="track-name">
        <Text>{currentTrack.name}</Text>
      </div>
    </div>
  {/key}
{/if}

<style lang="scss">
.track-info {
  @apply flex flex-col items-center;

  .image {
    @apply inline;
  }

  .title {
    @apply inline;
  }

  .track-name {
    @apply inline;
  }
}
</style>

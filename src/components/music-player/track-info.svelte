<script lang="ts">
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import type { Track } from "~/graphql/types";
import { playerService } from "~/machines/jukebox-machine";

let currentTrack: Track | undefined;

$: ({
  currentTrack, name
} = $playerService.context);
</script>

{#key currentTrack?.id}
  <div class="track-info">
    <div class="image">
      <Image src={currentTrack?.artworkL?.url} class="w-[300px] h-[300px]" />
    </div>
    <div class="track-name">
      <Text>{currentTrack?.name || ""}</Text>
    </div>
  </div>
{/key}

<style lang="scss">
.track-info {
  @apply flex flex-col items-center text-white text-center;

  .image {
    @apply inline w-[300px] h-[300px];
  }

  .track-name {
    @apply inline m-2 truncate w-10/12;
  }
}
</style>

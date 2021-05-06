<script lang="ts">
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import type { Track } from "~/graphql/types";
import { playerService } from "~/machines/jukebox-machine";

let currentTrack: Track | undefined;
let name: string | undefined;

$: {

  ({
    currentTrack, name
  } = $playerService.context);

}
</script>

{#if currentTrack && name}
  {#key currentTrack.id}
    <Text>{name}</Text>
    <Image src={currentTrack.artworkM.url} class="w-60 h-60" />
    <Text>{currentTrack.name}</Text>
  {/key}
{/if}

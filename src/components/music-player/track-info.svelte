<script lang="ts">
import Image from "../square-image.svelte";
import Text from "../text.svelte";
import type { Track } from "~/graphql/types";
import { playerService } from "~/machines/jukebox-machine";

let currentTrack: Track | undefined;
let name: string | undefined;

$: {

  ({ currentTrack, name } = $playerService.context);

}
</script>

{#if currentTrack && name}
  <Text>{name}</Text>
  <Image src={currentTrack.artworkM.url} class="w-60 h-60" />
  <Text>{currentTrack.name}</Text>
{/if}

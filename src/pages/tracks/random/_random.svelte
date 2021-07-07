<script lang="ts">
import ItemCard from "./../_item-card.svelte";
import AddAppleMusicPlaylistButton from "~/components/add-apple-music-playlist-button.svelte";
import Items from "~/components/items.svelte";
import Separate from "~/components/separate.svelte";
import type {
  Track, TracksQueryVariables
} from "~/graphql/types";
import { TracksDocument } from "~/graphql/types";
import Coffee from "~/icons/coffee.svelte";

const variables: TracksQueryVariables = {
  conditions: { random: true },
  cursor: { limit: 45 }
};

let tracks: Track[] = [];

const setTracks = (ts: Track[]) => {

  if (tracks.length > 0) {

    return "";

  }

  tracks = ts;
  return "";

};
</script>

<div class="random">
  <Separate text="Music Cafe" />

  <Coffee class="w-20 h-20 text-white" />

  <div class="services">
    <AddAppleMusicPlaylistButton
      name="Random"
      description={`${location.origin}/tracks/random`}
      {tracks}
    />
  </div>

  <div class="tracks">
    <Items
      {variables}
      type="track"
      document={TracksDocument}
      let:items
      let:item
      let:index
    >
      {setTracks(items)}
      <ItemCard {items} {item} {index} />
    </Items>
  </div>
</div>

<style lang="scss">
.random {
  @apply flex flex-col items-center;
  @apply mt-8 mb-20 space-y-5;

  .services {
    @apply mt-2 space-x-2;
  }

  .tracks {
    @apply w-full px-4 divide-y divide-gray-700;
  }
}
</style>

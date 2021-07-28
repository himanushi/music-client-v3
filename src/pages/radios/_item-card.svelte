<script lang="ts">
import { url } from "@roxi/routify";
import Favorite from "~/components/favorite.svelte";
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import type { Radio } from "~/graphql/types";

export let item: Radio;

const path = `/radios/${item.id}`;
</script>

<div>
  <a class="clickable" href={$url(path)}>
    <span class="image">
      <Image src={item.track?.artworkM?.url} class="h-16 w-16" />
    </span>
    <span class="name">
      <Text>{item.name}</Text>
    </span>
  </a>
  <span class="favorite">
    <Favorite type="radio" id={item.id} />
  </span>
</div>

<style lang="scss">
div {
  @apply relative flex flex-row items-center;
  @apply py-2;

  a {
    @apply w-full flex flex-row rounded;

    .name {
      @apply text-white m-2 self-center;
    }
  }
}
</style>

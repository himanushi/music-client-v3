<script>
import { mutation } from "svelte-apollo";
import IconButton from "./icon-button.svelte";
import type { Mutable } from "~/@types/extends";
import { ChangeFavoritesDocument } from "~/graphql/types";
import type {
  ChangeFavoritesMutationVariables,
  ChangeFavoritesInput
} from "~/graphql/types";
import HeartIcon from "~/icons/heart.svelte";
import {
  isAllowed, isFavorite, meQuery
} from "~/lib/me";

export let id: string;
export let type: "album" | "artist" | "track" | "playlist";

const query = meQuery();
$: me = $query?.data?.me;

let favorite = false;

$: if (me) {

  favorite = isFavorite(me, id);

}

const changeFavorites = mutation<unknown, ChangeFavoritesMutationVariables>(
  ChangeFavoritesDocument
);

const onClick = async () => {

  const input: Mutable<ChangeFavoritesInput> = { favorite: !favorite };

  if (type === "album") {

    input.albumIds = [id];

  } else if (type === "artist") {

    input.artistIds = [id];

  } else if (type === "track") {

    input.trackIds = [id];

  } else if (type === "playlist") {

    input.playlistIds = [id];

  }

  await changeFavorites({ variables: { input } });

};
</script>

{#if me && isAllowed(me, "changeFavorites")}
  <IconButton on:click={onClick} class="h-7 w-7">
    {#if favorite}
      <HeartIcon class="h-7 w-7" />
    {:else}
      <HeartIcon class="text-black h-7 w-7" />
    {/if}
  </IconButton>
{/if}

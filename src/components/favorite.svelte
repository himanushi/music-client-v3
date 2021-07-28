<script>
import { mutation } from "svelte-apollo";
import IconButton from "./icon-button.svelte";
import type { Mutable } from "~/@types/extends";
import { ChangeFavoritesDocument } from "~/graphql/types";
import type {
  ChangeFavoritesMutationVariables,
  ChangeFavoritesInput
} from "~/graphql/types";
import HeartFillIcon from "~/icons/heart-fill.svelte";
import HeartIcon from "~/icons/heart.svelte";
import {
  isAllowed, isFavorite, meQuery
} from "~/lib/me";

export let size: "s" | "m" = "m";
export let id: string;
export let type: "album" | "artist" | "track" | "playlist" | "radio";

const iconSize = size === "m" ? "h-8 w-8" : "h-5 w-5";
const buttonSize = size === "m" ? "h-10 w-10" : "h-8 w-8";

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
  <IconButton on:click={onClick} class={buttonSize}>
    {#if favorite}
      <HeartFillIcon class={`text-red-500 ${iconSize}`} />
    {:else}
      <HeartIcon class={`text-white ${iconSize}`} />
    {/if}
  </IconButton>
{/if}

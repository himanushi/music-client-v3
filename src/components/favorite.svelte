<script>
import {
  mutation, query
} from "svelte-apollo";
import IconButton from "./icon-button.svelte";
import type { Mutable } from "~/@types/extends";
import {
  ChangeFavoritesDocument, MeDocument
} from "~/graphql/types";
import type {
  CurrentUser,
  ChangeFavoritesMutationVariables,
  ChangeFavoritesInput,
  MeQuery
} from "~/graphql/types";
import HeartIcon from "~/icons/heart.svelte";

export let id: string;
export let type: "album" | "artist" | "track" | "playlist";

$: meQuery = query<MeQuery>(MeDocument, { fetchPolicy: "cache-first" });

let me: CurrentUser;
let favorite = false;

$: {

  if ($meQuery?.data?.me) {

    me = $meQuery?.data?.me as CurrentUser;

    const favoriteIds = [
      ...me.favorite.artistIds,
      ...me.favorite.albumIds,
      ...me.favorite.trackIds,
      ...me.favorite.playlistIds
    ];

    favorite = favoriteIds.includes(id);

  }

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

<IconButton on:click={onClick} class="h-7 w-7">
  {#if favorite}
    <HeartIcon size="h-7 w-7" />
  {:else}
    <HeartIcon size="h-7 w-7" color="text-black" />
  {/if}
</IconButton>

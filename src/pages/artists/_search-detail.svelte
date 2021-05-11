<script lang="ts">
import {
  goto, params
} from "@roxi/routify";
import IconButton from "~/components/icon-button.svelte";
import { modal } from "~/components/modal.svelte";
import SearchIcon from "~/icons/search.svelte";
import { SearchParams } from "~/lib/params";
import type { SearchParamsType } from "~/lib/params";

let keyword = $params[SearchParams.artist.keyword];
let favorite = $params[SearchParams.artist.favorite] === "1";
let username = $params[SearchParams.artist.username];

const onClock = () => {

  const parameters: SearchParamsType = {};
  if (keyword) {

    parameters[SearchParams.artist.keyword] = keyword;

  }
  if (favorite) {

    parameters[SearchParams.artist.favorite] = "1";

  }
  if (username) {

    parameters[SearchParams.artist.username] = username;

  }
  $goto("/artists", parameters);

};

const close = () => modal.set(null);
</script>

<div on:click|stopPropagation>
  <form on:submit|preventDefault={close}>
    <label
      >検索ワード
      <input type="text" bind:value={keyword} />
    </label>
    <label
      >お気に入り
      <input type="checkbox" bind:checked={favorite} />
    </label>
    <label
      >ユーザーID
      <input type="text" bind:value={username} />
    </label>
    <IconButton on:click={onClock}>
      <SearchIcon />
    </IconButton>
  </form>
</div>

<style lang="scss">
div {
  @apply h-full w-full bg-gray-500;
}
</style>

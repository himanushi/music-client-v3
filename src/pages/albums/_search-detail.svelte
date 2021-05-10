<script lang="ts">
import {
  goto, params
} from "@roxi/routify";
import IconButton from "~/components/icon-button.svelte";
import { modal } from "~/components/modal.svelte";
import SearchIcon from "~/icons/search.svelte";
import { SearchParams } from "~/lib/params";
import type { SearchParamsType } from "~/lib/params";

let keyword = $params[SearchParams.album.keyword];
let favorite = $params[SearchParams.album.favorite] === "1";

const onClock = () => {

  const parameters: SearchParamsType = {};
  if (keyword) {

    parameters[SearchParams.album.keyword] = keyword;

  }
  if (favorite) {

    parameters[SearchParams.album.favorite] = "1";

  }
  $goto("/albums", parameters);

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

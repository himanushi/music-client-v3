<script lang="ts">
import {
  goto, params
} from "@roxi/routify";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import SearchIcon from "~/icons/search.svelte";
import { SearchParams } from "~/lib/params";
import type { SearchParamsType } from "~/lib/params";

let keyword = $params[SearchParams.artist.keyword];
let favorite = $params[SearchParams.artist.favorite] === "1";
let username = $params[SearchParams.artist.username];
const order = $params[SearchParams.artist.order] || "NAME";
const direction = $params[SearchParams.artist.direction] || "DESC";

let orderValue = `${order}.${direction}`;
const orderItems = [
  {
    label: "名前降順",
    value: "NAME.DESC"
  },
  {
    label: "名前昇順",
    value: "NAME.ASC"
  },
  {
    label: "追加日新しい順",
    value: "NEW.DESC"
  },
  {
    label: "追加日古い順",
    value: "NEW.ASC"
  },
  {
    label: "人気順",
    value: "POPULARITY.DESC"
  }
];

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
  if (orderValue) {

    const [
      _order,
      _direction
    ] = orderValue.split(".");
    parameters[SearchParams.artist.order] = _order;
    parameters[SearchParams.artist.direction] = _direction;

  }
  $goto("/artists", parameters);

};

const close = () => modals.close();
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
    <select bind:value={orderValue}>
      {#each orderItems as item}
        <option value={item.value}>
          {item.label}
        </option>
      {/each}
    </select>
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

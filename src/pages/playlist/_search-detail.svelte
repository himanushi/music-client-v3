<script lang="ts">
import {
  goto, params
} from "@roxi/routify";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import SearchIcon from "~/icons/search.svelte";
import { SearchParams } from "~/lib/params";
import type { SearchParamsType } from "~/lib/params";

let keyword = $params[SearchParams.playlist.keyword];
let favorite = $params[SearchParams.playlist.favorite] === "1";
let username = $params[SearchParams.playlist.username];
const isMine = $params[SearchParams.playlist.mine] === "1";
const order = $params[SearchParams.playlist.order] || "NEW";
const direction = $params[SearchParams.playlist.direction] || "DESC";

let orderValue = `${order}.${direction}`;
const orderItems = [
  {
    label: "追加日新しい順",
    value: "NEW.DESC"
  },
  {
    label: "追加日古い順",
    value: "NEW.ASC"
  },
  {
    label: "更新日新しい順",
    value: "UPDATE.DESC"
  },
  {
    label: "更新日古い順",
    value: "UPDATE.ASC"
  }
];

const onClock = () => {

  const parameters: SearchParamsType = {};
  if (keyword) {

    parameters[SearchParams.playlist.keyword] = keyword;

  }
  if (favorite) {

    parameters[SearchParams.playlist.favorite] = "1";

  }
  if (username) {

    parameters[SearchParams.playlist.username] = username;

  }
  if (isMine) {

    parameters[SearchParams.playlist.mine] = "1";

  }
  if (orderValue) {

    const [
      _order,
      _direction
    ] = orderValue.split(".");
    parameters[SearchParams.playlist.order] = _order;
    parameters[SearchParams.playlist.direction] = _direction;

  }
  $goto("/playlist", parameters);

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

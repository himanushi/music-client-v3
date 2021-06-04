<script lang="ts">
import {
  goto, params
} from "@roxi/routify";
import { fly } from "svelte/transition";
import IconButton from "~/components/icon-button.svelte";
import InputCheckbox from "~/components/input-checkbox.svelte";
import InputSelection from "~/components/input-selection.svelte";
import InputText from "~/components/input-text.svelte";
import { modals } from "~/components/modals.svelte";
import Text from "~/components/text.svelte";
import SearchIcon from "~/icons/search.svelte";
import { SearchParams } from "~/lib/params";
import type { SearchParamsType } from "~/lib/params";

let keyword = $params[SearchParams.album.keyword];
let favorite = $params[SearchParams.album.favorite] === "1";
let username = $params[SearchParams.album.username];
const order = $params[SearchParams.album.order] || "RELEASE";
const direction = $params[SearchParams.album.direction] || "DESC";

let orderValue = `${order}.${direction}`;
const orderItems = [
  {
    label: "発売日新しい順",
    value: "RELEASE.DESC"
  },
  {
    label: "発売日古い順",
    value: "RELEASE.ASC"
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

    parameters[SearchParams.album.keyword] = keyword;

  }
  if (favorite) {

    parameters[SearchParams.album.favorite] = "1";

  }
  if (username) {

    parameters[SearchParams.album.username] = username;

  }
  if (orderValue) {

    const [
      _order,
      _direction
    ] = orderValue.split(".");
    parameters[SearchParams.album.order] = _order;
    parameters[SearchParams.album.direction] = _direction;

  }
  $goto("/albums", parameters);

};

const close = () => modals.close();
</script>

<div
  on:click|stopPropagation
  transition:fly={{
    duration: 400,
    opacity: 100,
    x: document.body.clientWidth
  }}
  class="modal"
>
  <form on:submit|preventDefault={close}>
    <div class="separate">
      <Text class="text-white">Search Albums</Text>
    </div>
    <InputText label="検索ワード" bind:value={keyword} />
    <InputText label="お気に入り公開ユーザーID" bind:value={username} />
    <InputSelection label="並び順" bind:value={orderValue} items={orderItems} />
    <InputCheckbox label="お気に入り" bind:checked={favorite} />
    <IconButton class="w-16 h-16" on:click={onClock}>
      <SearchIcon class="w-10 h-10 mr-2" />
    </IconButton>
  </form>
</div>

<style lang="scss">
.modal {
  @apply absolute inset-0 m-auto overflow-hidden;
  @apply bg-gray-800 rounded;
  @apply w-[300px];
  height: fit-content;

  .separate {
    @apply my-6 border-b-2 w-36 border-gray-500 text-lg text-center;
  }

  form {
    @apply flex flex-col items-center space-y-4 my-4 text-white;
  }
}
</style>

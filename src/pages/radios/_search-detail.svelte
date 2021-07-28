<script lang="ts">
import {
  goto, params
} from "@roxi/routify";
import InputCheckbox from "~/components/input-checkbox.svelte";
import InputSelection from "~/components/input-selection.svelte";
import InputText from "~/components/input-text.svelte";
import SearchDetail from "~/components/search-detail.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import { SearchParams } from "~/lib/params";
import type { SearchParamsType } from "~/lib/params";

let keyword = $params[SearchParams.playlist.keyword];
let favorite = $params[SearchParams.playlist.favorite] === "1";
const order = $params[SearchParams.playlist.order] || "POPULARITY";
const direction = $params[SearchParams.playlist.direction] || "DESC";

let orderValue = `${order}.${direction}`;
const orderItems = [
  {
    label: "人気順",
    value: "POPULARITY.DESC"
  },
  {
    label: "追加日新しい順",
    value: "NEW.DESC"
  },
  {
    label: "追加日古い順",
    value: "NEW.ASC"
  }
];

const onClick = () => {

  const parameters: SearchParamsType = {};
  if (keyword) {

    parameters[SearchParams.radio.keyword] = keyword;

  }
  if (favorite) {

    parameters[SearchParams.radio.favorite] = "1";

  }
  if (orderValue) {

    const [
      _order,
      _direction
    ] = orderValue.split(".");
    parameters[SearchParams.radio.order] = _order;
    parameters[SearchParams.radio.direction] = _direction;

  }
  $goto("/radios", parameters);

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

<SearchDetail title="Search Playlist" {onClick}>
  <InputText label="検索ワード" bind:value={keyword} />
  <InputSelection label="並び順" bind:value={orderValue} items={orderItems} />
  {#if me && isAllowed(me, "changeFavorites")}
    <InputCheckbox label="お気に入り" bind:checked={favorite} />
  {/if}
</SearchDetail>

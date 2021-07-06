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

let keyword = $params[SearchParams.track.keyword];
let favorite = $params[SearchParams.track.favorite] === "1";
let username = $params[SearchParams.track.username];
const order = $params[SearchParams.track.order] || "NEW";
const direction = $params[SearchParams.track.direction] || "DESC";

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
    label: "人気順",
    value: "POPULARITY.DESC"
  }
];

const onClick = () => {

  const parameters: SearchParamsType = {};
  if (keyword) {

    parameters[SearchParams.track.keyword] = keyword;

  }
  if (favorite) {

    parameters[SearchParams.track.favorite] = "1";

  }
  if (username) {

    parameters[SearchParams.track.username] = username;

  }
  if (orderValue) {

    const [
      _order,
      _direction
    ] = orderValue.split(".");
    parameters[SearchParams.track.order] = _order;
    parameters[SearchParams.track.direction] = _direction;

  }
  $goto("/tracks", parameters);

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

<SearchDetail title="Search Tracks" {onClick}>
  <InputText label="検索ワード(2文字以上)" bind:value={keyword} />
  <InputText label="お気に入り公開ユーザーID" bind:value={username} />
  <InputSelection label="並び順" bind:value={orderValue} items={orderItems} />
  {#if me && isAllowed(me, "changeFavorites")}
    <InputCheckbox label="お気に入り" bind:checked={favorite} />
  {/if}
</SearchDetail>

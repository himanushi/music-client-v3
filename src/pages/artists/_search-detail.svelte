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

let statusValue = $params[SearchParams.artist.status] || "ACTIVE";
const statusItems = [
  {
    label: "有効",
    value: "ACTIVE"
  },
  {
    label: "保留",
    value: "PENDING"
  },
  {
    label: "除外",
    value: "IGNORE"
  },
  {
    label: "有効 & 保留",
    value: "ACTIVE-PENDING"
  },
  {
    label: "有効 & 除外",
    value: "ACTIVE-PENDING"
  },
  {
    label: "保留 & 除外",
    value: "PENDING-IGNORE"
  },
  {
    label: "有効 & 保留 & 除外",
    value: "ACTIVE-PENDING-IGNORE"
  }
];

const onClick = () => {

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
  if (statusValue !== "ACTIVE") {

    parameters[SearchParams.artist.status] = statusValue;

  }
  $goto("/artists", parameters);

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

<SearchDetail title="Search Artists" {onClick}>
  <InputText label="検索ワード" bind:value={keyword} />
  <InputText label="お気に入り公開ユーザーID" bind:value={username} />
  <InputSelection label="並び順" bind:value={orderValue} items={orderItems} />
  {#if me && isAllowed(me, "changeFavorites")}
    <InputCheckbox label="お気に入り" bind:checked={favorite} />
  {/if}
  {#if me && isAllowed(me, "changeStatus")}
    <InputSelection
      label="ステータス"
      bind:value={statusValue}
      items={statusItems}
    />
  {/if}
</SearchDetail>

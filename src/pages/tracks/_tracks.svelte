<script lang="ts">
import ItemCard from "./_item-card.svelte";
import Items from "~/components/items.svelte";
import { TracksDocument } from "~/graphql/types";
import { SearchParams } from "~/lib/params";

export let params: { [key: string]: any } | undefined = undefined;

let keyword: string;
let favorite = false;

$: if (params) {

  const preKeyword = params[SearchParams.track.keyword];
  favorite = params[SearchParams.track.favorite] === "1";

  if (preKeyword && preKeyword.length >= 3) {

    keyword = preKeyword;

  }

}
</script>

{#if keyword || favorite}
  <Items
    {params}
    type="track"
    document={TracksDocument}
    let:items
    let:item
    let:index
  >
    <ItemCard {items} {item} {index} />
  </Items>
{/if}

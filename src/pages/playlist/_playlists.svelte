<script lang="ts">
import ItemCard from "./_item-card.svelte";
import Items from "~/components/items.svelte";
import { PlaylistsDocument } from "~/graphql/types";

export let params: { [key: string]: any } | undefined = undefined;
export let variables: any | undefined = undefined;
</script>

<Items
  {params}
  {variables}
  type="playlist"
  document={PlaylistsDocument}
  let:item
>
  <ItemCard {item} />
</Items>

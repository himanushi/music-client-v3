<script lang="ts">
import {
  onMount, onDestroy, getContext
} from "svelte";
import { interpret } from "xstate";
import ItemCard from "./_item-card.svelte";
import Waypoint from "~/components/waypoint.svelte";
import { AlbumsDocument } from "~/graphql/types";
import type {
  Album, AlbumsQuery, AlbumsQueryVariables
} from "~/graphql/types";
import { itemsMachine } from "~/machines/items-machine";

export let params: { [key: string]: any } | undefined = undefined;
export let variables: AlbumsQueryVariables | undefined = undefined;

let service: any;

onMount(() => {

  service = interpret(
    itemsMachine<Album, AlbumsQuery>("album", AlbumsDocument)
  ).start();

});

onDestroy(() => {

  service.stop();

});

$: if (service) {

  if (params) {

    service.send({
      params,
      type: "SET_PARAMETERS"
    });

  } else if (variables) {

    service.send({
      type: "SET_VARIABLES",
      variables
    });

  }

  service.send({ type: "EXECUTE_QUERY" });

}

let items: Album[];
$: items = $service?.context.items || [];

const { getElement } = getContext("content");
const elementScroll: HTMLElement = getElement();
</script>

{#each items as item, index (`${item.id}_${index}`)}
  <ItemCard id={item.id} name={item.name} src={item.artworkM.url || ""} />
{/each}

<Waypoint
  threshold={300}
  {elementScroll}
  on:loadMore={() => service.send("FETCH_MORE")}
/>

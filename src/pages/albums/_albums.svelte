<script lang="ts">
import {
  onMount, onDestroy, getContext
} from "svelte";
import { interpret } from "xstate";
import ItemCard from "./_item-card.svelte";
import Waypoint from "~/components/waypoint.svelte";
import type { AlbumsQueryVariables } from "~/graphql/types";
import { albumsMachine } from "~/machines/albums-machine";
import type { albumsServiceType } from "~/machines/albums-machine";

export let params: { [key: string]: any } | undefined = undefined;
export let variables: AlbumsQueryVariables | undefined = undefined;

let service: albumsServiceType;

onMount(() => {

  service = interpret(albumsMachine).start();

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

$: albums = $service?.context.albums || [];

const { getElement } = getContext("content");
const elementScroll: HTMLElement = getElement();
</script>

{#each albums as album, index (`${album.id}_${index}`)}
  <ItemCard id={album.id} name={album.name} src={album.artworkM.url || ""} />
{/each}

<Waypoint
  threshold={300}
  {elementScroll}
  on:loadMore={() => service.send("FETCH_MORE")}
/>

<script lang="ts">
import { params } from "@roxi/routify";
import {
  onMount, onDestroy, getContext
} from "svelte";
import { interpret } from "xstate";
import ItemCard from "./_item-card.svelte";
import SearchBar from "./_search-bar.svelte";
import SearchDetailButton from "./_search-detail-button.svelte";
import Waypoint from "~/components/waypoint.svelte";
import { albumsMachine } from "~/machines/albums-machine";
import type { albumsServiceType } from "~/machines/albums-machine";

let service: albumsServiceType;

onMount(() => {

  service = interpret(albumsMachine).start();

});

onDestroy(() => {

  service.stop();

});

$: if (service) {

  service.send({
    params: $params,
    type: "SET_PARAMETERS"
  });

  service.send({ type: "EXECUTE_QUERY" });

}

$: albums = $service?.context.albums || [];

const { getElement } = getContext("content");
const elementScroll: HTMLElement = getElement();
</script>

<SearchBar />
<SearchDetailButton />

<div class="albums">
  {#each albums as album, index (`${album.id}_${index}`)}
    <ItemCard id={album.id} name={album.name} src={album.artworkM.url || ""} />
  {/each}
  <Waypoint
    threshold={500}
    {elementScroll}
    on:loadMore={() => service.send("FETCH_MORE")}
  />
</div>

<style>
.albums {
  @apply flex flex-wrap;
}
</style>

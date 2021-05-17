<script lang="ts">
import type { DocumentNode } from "@apollo/client";
import {
  onMount, onDestroy, getContext
} from "svelte";
import { interpret } from "xstate";
import Waypoint from "~/components/waypoint.svelte";
import type { ParameterPrefix } from "~/lib/build-parameters";
import { itemsMachine } from "~/machines/items-machine";

export let type: ParameterPrefix;
export let document: DocumentNode;
export let params: { [key: string]: any } | undefined = undefined;
export let variables: any | undefined = undefined;

let service: any;

onMount(() => {

  service = interpret(itemsMachine(type, document)).start();

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

let items: any[];
$: items = $service?.context.items || [];

const { getElement } = getContext("content");
const elementScroll: HTMLElement = getElement();
</script>

{#each items as item, index (`${item.id}_${index}`)}
  <slot {item} />
{/each}

<Waypoint
  threshold={300}
  {elementScroll}
  on:loadMore={() => service.send("FETCH_MORE")}
/>

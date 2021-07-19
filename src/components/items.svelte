<script lang="ts">
import type { DocumentNode } from "@apollo/client";
import {
  onMount, onDestroy
} from "svelte";
import { interpret } from "xstate";
import Message from "./toast-messages/message.svelte";
import { toasts } from "./toasts.svelte";
import Waypoint from "~/components/waypoint.svelte";
import Loading from "~/icons/loading.svelte";
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

let reported = false;
$: if (
  service &&
  $service.matches("active") &&
  items.length === 0 &&
  !reported
) {

  toasts.open({
    closeMs: 5000,
    component: Message,
    props: {
      text: "一致する検索結果はありませんでした",
      type: "info"
    }
  });

  reported = true;

}

const elementScroll: HTMLElement = window as unknown as HTMLElement;
</script>

{#each items as item, index (`${item.id}_${index}`)}
  <slot {items} {item} {index} />
{/each}

{#if service && !$service.matches("active")}
  <Loading />
{/if}

<Waypoint
  threshold={100}
  {elementScroll}
  on:loadMore={() => service.send("FETCH_MORE")}
/>

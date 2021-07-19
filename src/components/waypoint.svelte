<script>
// ref: https://github.com/andrelmlins/svelte-infinite-scroll/blob/master/src/lib/InfiniteScroll.svelte
import {
  onMount, onDestroy, createEventDispatcher
} from "svelte";

export let threshold = 0;
export let hasMore = true;
export let elementScroll: HTMLElement | null = null;

const dispatch = createEventDispatcher();

let isLoadMore = false;
let component: HTMLElement;
let beforeScrollHeight: number;
let beforeScrollTop: number;
let element: HTMLElement;

const calcOffset = (event: Event) => {

  let targetElement = event.target as HTMLElement | Document;

  if ("documentElement" in targetElement) {

    targetElement = targetElement.documentElement;

  }

  return (
    targetElement.scrollHeight -
    targetElement.clientHeight -
    targetElement.scrollTop
  );

};

const onScroll = (event: Event) => {

  if (!hasMore) {

    return;

  }

  const offset = calcOffset(event);

  if (offset <= threshold) {

    if (!isLoadMore && hasMore) {

      dispatch("loadMore");

      const targetElement = event.target as HTMLElement;

      beforeScrollHeight = targetElement.scrollHeight;
      beforeScrollTop = targetElement.scrollTop;

    }
    isLoadMore = true;

  } else {

    isLoadMore = false;

  }

};

$: if (element) {

  element.addEventListener("scroll", onScroll);
  element.addEventListener("resize", onScroll);

}

$: if (isLoadMore) {

  element.scrollTop =
    element.scrollHeight - beforeScrollHeight + beforeScrollTop;

}

onMount(() => {

  if (elementScroll) {

    element = elementScroll;

  } else {

    element = component.parentNode as HTMLElement;

  }

});

onDestroy(() => {

  if (element) {

    element.removeEventListener("scroll", onScroll);
    element.removeEventListener("resize", onScroll);

  }

});
</script>

<span bind:this={component} style="display: none;" />

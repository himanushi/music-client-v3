<script context="module" lang="ts">
import { SvelteComponent } from "svelte";
import { writable } from "svelte/store";

const createStore = () => {

  const {
    subscribe, update
  } = writable<typeof SvelteComponent[]>([]);

  return {
    close: () => {

      update((components) => {

        components.pop();

        return components;

      });

    },

    open: (component: typeof SvelteComponent) => {

      update((components) => {

        components.push(component);

        return components;

      });

    },

    subscribe
  };

};

export const modals = createStore();
</script>

<script lang="ts">
const close = () => modals.close();
</script>

{#if $modals.length > 0}
  {#each $modals as modal}
    <div on:click={close}>
      <svelte:component this={modal} />
    </div>
  {/each}
{/if}

<style lang="scss">
div {
  @apply absolute w-full h-full z-50;
  @apply bg-black bg-opacity-30;
}
</style>

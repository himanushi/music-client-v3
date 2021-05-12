<script context="module" lang="ts">
import { SvelteComponent } from "svelte";
import { writable } from "svelte/store";

type modalType = {
  component: typeof SvelteComponent;
  // 外側クリックでクローズする場合は true, デフォルトは true
  backdrop?: boolean;
  class?: string;
};

// eslint-disable-next-line max-lines-per-function
const createStore = () => {

  const {
    subscribe, update
  } = writable<modalType[]>([]);

  return {
    close: () => {

      update((components) => {

        components.pop();

        return components;

      });

    },

    open: (props: modalType | typeof SvelteComponent) => {

      update((components) => {

        if ("component" in props) {

          components.push(props);

        } else {

          components.push({ component: props });

        }

        return components;

      });

    },

    subscribe
  };

};

export const modals = createStore();
</script>

<script lang="ts">
const close = (modal: modalType) => () => {

  if (modal.backdrop === undefined || modal.backdrop) {

    modals.close();

  }

};
</script>

{#if $modals.length > 0}
  {#each $modals as modal}
    <div
      class={`bg-black bg-opacity-30 w-full h-full ${modal.class}`}
      on:click={close(modal)}
    >
      <svelte:component this={modal.component} />
    </div>
  {/each}
{/if}

<style lang="scss">
div {
  @apply absolute z-50;
}
</style>

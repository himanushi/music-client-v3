<script context="module" lang="ts">
import { SvelteComponent } from "svelte";
import { writable } from "svelte/store";

type modalType<T> = {
  component: typeof SvelteComponent;
  // 外側クリックでクローズする場合は true, デフォルトは true
  backdrop?: boolean;
  class?: string;
  props?: T;
};

// eslint-disable-next-line max-lines-per-function
const createStore = () => {

  const {
    subscribe, update
  } = writable<modalType<any>[]>([]);

  return {
    close: () => {

      update((components) => {

        components.pop();

        return components;

      });

    },

    open<T> (props: modalType<T> | typeof SvelteComponent) {

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
const close = (modal: modalType<any>) => () => {

  if (modal.backdrop === undefined || modal.backdrop) {

    modals.close();

  }

};

const args = (props?: {}) => {

  if (props) {

    return { props };

  }
  return {};

};
</script>

{#if $modals.length > 0}
  {#each $modals as modal}
    <div
      class={`bg-black bg-opacity-30 w-full h-full ${modal.class}`}
      on:click={close(modal)}
    >
      <svelte:component this={modal.component} {...args(modal.props)} />
    </div>
  {/each}
{/if}

<style lang="scss">
div {
  @apply fixed z-30 top-0;
}
</style>

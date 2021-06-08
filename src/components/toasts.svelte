<script context="module" lang="ts">
import { SvelteComponent } from "svelte";
import { writable } from "svelte/store";
import { v4 as uuid } from "uuid";

export type toastType<T> = {
  id?: string;
  component: typeof SvelteComponent;
  props?: T;
};

// eslint-disable-next-line max-lines-per-function
const createStore = () => {

  const {
    subscribe, update
  } = writable<toastType<any>[]>([]);

  return {
    close: () => {

      update((components) => {

        components.pop();

        return components;

      });

    },

    open<T> (props: toastType<T>) {

      update((components) => {

        components.push({
          ...props,
          id: uuid()
        });

        return components;

      });

    },

    subscribe
  };

};

export const toasts = createStore();
</script>

<script lang="ts">
// eslint-disable-next-line import/order
import { fade } from "svelte/transition";

const args = (props?: {}) => {

  if (props) {

    return { props };

  }
  return {};

};
</script>

{#if $toasts.length > 0}
  {#key $toasts[$toasts.length - 1].id}
    <div transition:fade>
      <svelte:component
        this={$toasts[$toasts.length - 1].component}
        {...args($toasts[$toasts.length - 1].props)}
      />
    </div>
  {/key}
{/if}

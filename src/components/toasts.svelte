<script context="module" lang="ts">
import { SvelteComponent } from "svelte";
import { writable } from "svelte/store";

type toastType<T> = {
  component: typeof SvelteComponent;
  okClick?: () => void;
  type: "info" | "warn" | "error";
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

        components.push(props);

        return components;

      });

    },

    subscribe
  };

};

export const toasts = createStore();
</script>

<script lang="ts">
import { fade } from "svelte/transition";

const close = () => {

  toasts.close();

};

const args = (props?: {}) => {

  if (props) {

    return { props };

  }
  return {};

};
</script>

{#if $toasts.length > 0}
  {#each $toasts as toast}
    <div transition:fade={{ duration: 100 }}>
      <svelte:component this={toast.component} {...args(toast.props)} />
      {#if toast.okClick}
        <span on:click={toast.okClick}>ok</span>
      {:else}
        <span on:click={close}>x</span>
      {/if}
    </div>
  {/each}
{/if}

<style lang="scss">
div {
  @apply absolute bg-gray-500 z-50 inline h-auto bottom-32 left-0 right-0;
}
</style>

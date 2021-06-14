<script context="module">
export type Props = {
  title: string;
  yesClick: () => void;
  noClick: () => void;
};
</script>

<script>
import { fade } from "svelte/transition";

import Button from "~/components/button.svelte";
import Text from "~/components/text.svelte";

export let props: Props;

let disabled = false;

const onClick = (click: () => void) => async () => {

  disabled = true;
  await click();
  disabled = false;

};
</script>

<div transition:fade={{ duration: 200 }} class="confirm">
  <div class="title"><Text>{props.title}</Text></div>
  <div class="buttons">
    <Button on:click={onClick(props.yesClick)}>はい</Button>
    <Button on:click={onClick(props.noClick)}>いいえ</Button>
  </div>
</div>

<style lang="scss">
.confirm {
  @apply absolute inset-0 m-auto overflow-hidden py-2;
  @apply bg-gray-800 rounded;
  @apply h-[150px] w-[300px];
  @apply text-white;
  @apply flex flex-col items-center;

  .title {
    @apply text-lg text-center m-3;
  }

  .buttons {
    @apply flex flex-row space-x-10 m-3;
  }
}
</style>

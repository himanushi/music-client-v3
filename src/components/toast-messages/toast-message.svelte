<script lang="ts">
import { SvelteComponent } from "svelte";
import { toasts } from "../toasts.svelte";
import Check from "~/icons/check.svelte";
import Close from "~/icons/close.svelte";
import Danger from "~/icons/danger.svelte";
import Info from "~/icons/info.svelte";

export let type: "success" | "info" | "error";
export let okClick: (() => void) | undefined = undefined;

let toastClass = "";
let iconClass = "";
let Icon: typeof SvelteComponent = Info;

$: if (type === "success") {

  toastClass += " bg-green-100 text-green-900";
  iconClass += " text-green-500";
  Icon = Check;

} else if (type === "info") {

  toastClass += " bg-blue-100 text-blue-900";
  iconClass += " text-blue-500";
  Icon = Info;

} else if (type === "error") {

  toastClass += " bg-red-100 text-red-900";
  iconClass += " text-red-500";
  Icon = Danger;

}

const close = () => toasts.close();
</script>

<div class={`toast ${toastClass}`}>
  <span class={`icon ${iconClass}`}>
    <Icon class="w-5 h-5" />
  </span>
  <span class="content">
    <slot />
  </span>
  {#if okClick}
    <span class="button clickable" on:click={okClick}>OK</span>
  {:else}
    <span class="button clickable" on:click={close}>
      <Close class="w-5 h-5" />
    </span>
  {/if}
</div>

<style lang="scss">
.toast {
  /* 位置 */
  @apply fixed bottom-24 left-2 right-2 z-50;
  @apply sm_left-1/2 sm_right-auto sm_transform sm_-translate-x-1/2;
  /* 形 */
  @apply p-3 rounded flex text-sm items-center;

  .icon {
    @apply flex-shrink-0 mr-3;
  }

  .content {
    @apply flex-1;
  }

  .button {
    @apply flex-shrink-0 ml-3 self-center p-2 rounded;
  }
}
</style>

<script lang="ts">
import Text from "~/components/text.svelte";
import Live from "~/icons/live.svelte";
import { radioService } from "~/machines/radio-machine";

export let id: string;

let disabled = false;

const live = () => {

  radioService.send({
    id,
    type: "SET_ID"
  });

  disabled = true;
  setTimeout(() => disabled = false, 10000);

};
</script>

<button {disabled} on:click={live}>
  <Live class="w-8 h-8 text-red-500" />
  <Text>ラジオを聴く</Text>
</button>

<style lang="scss">
button {
  @apply p-2 rounded flex flex-row items-center space-x-2;
  @apply bg-red-50 disabled_bg-gray-700 disabled_cursor-not-allowed;
}
</style>

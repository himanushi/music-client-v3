<script>
import Text from "./text.svelte";

export let text: string;
</script>

<div class="separate">
  <Text class="text-white">{text}</Text>
</div>

<style lang="scss">
.separate {
  @apply mt-6 border-b-2 w-36 border-gray-500 text-lg text-center;
}
</style>

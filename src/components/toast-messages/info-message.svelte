<script>
import Text from "~/components/text.svelte";
import Info from "~/icons/info.svelte";

let className = "";
export { className as class };
export let size: "s" | "m" = "m";

const iconClass = size === "m" ? "h-6 w-6" : "h-5 w-5";
const textClass = size === "m" ? "text-base" : "text-sm";
</script>

<span class={className}>
  <Info class={`flex-shrink-0 mr-1 ${iconClass}`} />
  <Text class={textClass}><slot /></Text>
</span>

<style lang="scss">
span {
  @apply flex flex-row;
}
</style>

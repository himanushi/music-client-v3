<script lang="ts">
import Text from "~/components/text.svelte";
import { timerService } from "~/machines/timer-machine";
</script>

{#if $timerService}
  <div class="time">
    <Text>{$timerService.context.hours}</Text>
    <div class="colon">:</div>
    <Text>{$timerService.context.minutes}</Text>
  </div>
{/if}

<style lang="scss">
@keyframes flash {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

.time {
  @apply flex flex-row justify-center items-center;
  @apply text-white text-5xl;

  .colon {
    animation: flash 2s linear infinite;
    font-size: 2.25rem;
    @apply mx-1;
  }
}
</style>

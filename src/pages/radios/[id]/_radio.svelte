<script lang="ts">
import { query } from "svelte-apollo";
import DeleteButton from "./_delete-button.svelte";
import LiveButton from "./_live-button.svelte";
import InfoMessage from "~/components/info-message.svelte";
import Separate from "~/components/separate.svelte";
import SettingAppleMusicButton from "~/components/setting-apple-music-button.svelte";
import Image from "~/components/square-image.svelte";
import Text from "~/components/text.svelte";
import { RadioDocument } from "~/graphql/types";
import type {
  Radio, RadioQuery
} from "~/graphql/types";
import { accountService } from "~/machines/apple-music-account-machine";

export let id = "";

const radioQuery = query<RadioQuery>(RadioDocument, {
  fetchPolicy: "no-cache",
  variables: { id }
});

let radio: Radio;
let isMine = false;

$: if ($radioQuery?.data) {

  radio = $radioQuery?.data.radio as Radio;
  isMine = Boolean(radio.isMine);

}
</script>

<div class="radio">
  {#if radio}
    <Separate text="Radio" />
    <div class="iamge">
      <Image src={radio.track?.artworkL.url} class="h-80 w-80" />
    </div>
    <div class="name">
      <Text class="text-lg text-white">{radio.name}</Text>
    </div>
    <div class="description">
      <Text class="text-sm text-gray-400">{radio.description}</Text>
    </div>
    {#if accountService && $accountService.matches("authorized")}
      <LiveButton {id} />
    {:else}
      <SettingAppleMusicButton />
      <InfoMessage class="mx-12 text-gray-300" size="s">
        ラジオを聴くためには Apple Music のログインが必須です
      </InfoMessage>
    {/if}
  {/if}
</div>

{#if isMine}
  <DeleteButton {id} />
{/if}

<style lang="scss">
.radio {
  @apply flex flex-col items-center space-y-5;
  @apply mb-2;

  .name {
    @apply mt-2 text-center w-80;
  }

  .description {
    @apply mt-2 text-center w-80;
  }
}
</style>

<script lang="ts">
import AccountButton from "./_account-button.svelte";
import AppleMusicButton from "./_apple-music-button.svelte";
import SpotifyButton from "./_spotify-button.svelte";
import Separate from "~/components/separate.svelte";
import Text from "~/components/text.svelte";
import InfoMessage from "~/components/toast-messages/info-message.svelte";
import { meQuery } from "~/lib/me";

const query = meQuery();
$: me = $query?.data?.me;
</script>

<div>
  <Separate text="User Setting" />
  {#if me?.registered}
    <Text>名前 : {me.name}</Text>
    <Text>ユーザーID : {me.username}</Text>
    <Text>権限 : {me.role.description}</Text>
  {/if}
  <AccountButton />

  <Separate text="Music Services" />
  <AppleMusicButton />
  <SpotifyButton />
  <InfoMessage class="mx-12 text-gray-300" size="s">
    ログインすると、フル再生や音楽サービスにプレイリスト追加などが出来るようになります。Spotify
    の場合は Premium プランのみフル再生が可能です。
  </InfoMessage>
</div>

<style lang="scss">
div {
  @apply flex flex-col items-center space-y-6 text-white pb-4;
}
</style>

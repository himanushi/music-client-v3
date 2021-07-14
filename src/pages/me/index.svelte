<script lang="ts">
import isMobile from "ismobilejs";
import AccountButton from "./_account-button.svelte";
import AppleMusicButton from "./_apple-music-button.svelte";
import InfoMessage from "~/components/info-message.svelte";
import JoinAppleMusicButton from "~/components/join-apple-music-button.svelte";
import Separate from "~/components/separate.svelte";
import Text from "~/components/text.svelte";
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
  <JoinAppleMusicButton />
  <InfoMessage class="mx-12 text-gray-300" size="s">
    Apple Music 加入後にログインすると、ブラウザ上でフル再生や Apple Music
    にプレイリスト追加などが出来るようになります。
    {#if (/Win/iu).test(navigator.platform)}
      Windows の場合は事前に、
      <a
        class="windows"
        href="https://support.apple.com/ja-jp/HT210384"
        target="_blank"
      >
        iTunes for Windows
      </a>
      をインストールをしてください。
    {/if}
    {#if isMobile(window.navigator).android.device}
      Android の場合は事前に、
      <a
        class="android"
        href="https://play.google.com/store/apps/details?id=com.apple.android.music"
        target="_blank"
      >
        Apple Music
      </a>
      をインストールをしてください。
    {/if}
  </InfoMessage>
</div>

<style lang="scss">
div {
  @apply flex flex-col items-center space-y-6 text-white pb-4;
}

a {
  @apply underline font-bold;
}
</style>

<script lang="ts">
import AccountButton from "./_account-button.svelte";
import AppleMusicButton from "./_apple-music-button.svelte";
import SpotifyButton from "./_spotify-button.svelte";
import Text from "~/components/text.svelte";
import { meQuery } from "~/lib/me";

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me}
  <Text>名前 : {me.name || "未設定"}</Text>
  <Text>ユーザー名 : {me.username || "未設定"}</Text>
  <Text>権限 : {me.role.description}</Text>

  <AccountButton />
  <AppleMusicButton />
  <SpotifyButton />
{/if}

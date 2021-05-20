<script lang="ts">
import { query } from "svelte-apollo";
import AccountButton from "./_account-button.svelte";
import AppleMusicButton from "./_apple-music-button.svelte";
import SpotifyButton from "./_spotify-button.svelte";
import Text from "~/components/text.svelte";
import { MeDocument } from "~/graphql/types";
import type {
  CurrentUser, MeQuery
} from "~/graphql/types";

$: meQuery = query<MeQuery>(MeDocument, { fetchPolicy: "cache-first" });

let me: CurrentUser;
$: me = $meQuery?.data?.me as CurrentUser;
</script>

{#if me}
  <Text>名前 : {me.name || "未設定"}</Text>
  <Text>ユーザー名 : {me.username || "未設定"}</Text>
  <Text>権限 : {me.role.name}</Text>

  <AccountButton />
  <AppleMusicButton />
  <SpotifyButton />
{/if}

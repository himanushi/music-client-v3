<script lang="ts">
import { url } from "@roxi/routify";
import LogoutButton from "./_logout-button.svelte";
import Text from "~/components/text.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

$: query = meQuery();
$: me = $query?.data?.me;
</script>

<Text>アカウント</Text>

{#if me && isAllowed(me, "logout") && me.registered}
  <LogoutButton />
{:else if me && isAllowed(me, "login")}
  <a href={$url("/me/login")}>ログイン</a>
  <a href={$url("/me/signup")}>登録する</a>
{/if}

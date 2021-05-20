<script lang="ts">
import { url } from "@roxi/routify";
import Text from "~/components/text.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import { accountService as account } from "~/machines/account-machine";

const logout = () => account.send("LOGOUT");

const query = meQuery();
$: me = $query?.data?.me;
</script>

<Text>アカウント</Text>

{#if me && isAllowed(me, "logout") && $account.matches("authorized")}
  <button on:click={logout}>ログアウト</button>
{:else if me && isAllowed(me, "login")}
  <a class="card" href={$url("/me/login")}>ログイン</a>
{/if}

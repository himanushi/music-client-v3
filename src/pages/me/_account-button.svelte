<script lang="ts">
import { url } from "@roxi/routify";
import Text from "~/components/text.svelte";
import { accountService as account } from "~/machines/account-machine";

const logout = () => account.send("LOGOUT");
</script>

<Text>アカウント</Text>

{#if $account.matches("authorized")}
  <button on:click={logout}>ログアウト</button>
{:else}
  <a class="card" href={$url("/me/login")}>ログイン</a>
{/if}

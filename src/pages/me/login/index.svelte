<script lang="ts">
import { goto } from "@roxi/routify";
import {
  isAllowed, meQuery
} from "~/lib/me";
import { accountService as account } from "~/machines/account-machine";

let password: string;
let username: string;

const login = () => account.send([
  {
    password,
    type: "SET_LOGIN_INFO",
    username
  },
  { type: "LOGIN" }
]);

$: if ($account.matches("authorized")) {

  $goto("/me");

}

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "login")}
  <label>
    ユーザー名
    <input type="text" bind:value={username} />
  </label>

  <label>
    パスワード
    <input type="text" bind:value={password} />
  </label>

  <button on:click={login}>ログイン</button>
{/if}

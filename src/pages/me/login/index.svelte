<script lang="ts">
import { goto } from "@roxi/routify";
import { accountService } from "~/machines/account-machine";

let password: string;
let username: string;

const login = () => accountService.send([
  {
    password,
    type: "SET_LOGIN_INFO",
    username
  },
  { type: "LOGIN" }
]);

$: if ($accountService.matches("authorized")) {

  $goto("/me");

}
</script>

<label>
  ユーザー名
  <input type="text" bind:value={username} />
</label>

<label>
  パスワード
  <input type="text" bind:value={password} />
</label>

<button on:click={login}>ログイン</button>

<script lang="ts">
import { url } from "@roxi/routify";
import LogoutButton from "./_logout-button.svelte";
import Text from "~/components/text.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

let logouted = false;

$: query = meQuery();
$: me = $query?.data?.me;
</script>

<Text>アカウント</Text>

{#if me && isAllowed(me, "logout") && me.registered}
  <LogoutButton bind:logouted />
{:else if me && isAllowed(me, "login")}
  <a class="card" href={$url("/me/login")}>ログイン</a>
{/if}

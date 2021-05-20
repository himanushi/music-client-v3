<script lang="ts">
import { goto } from "@roxi/routify";
import {
  isAllowed, meQuery
} from "~/lib/me";

const create = () => $goto("/playlist/new");

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "upsertPlaylist")}
  <button on:click={create}>プレイリスト作成</button>
{/if}

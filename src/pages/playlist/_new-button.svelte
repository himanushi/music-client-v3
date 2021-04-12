<script lang="ts">
import { goto } from "@roxi/routify";

const create = () => {

  $goto("/playlist/new");

};
</script>

<button on:click={create}>プレイリスト作成</button>

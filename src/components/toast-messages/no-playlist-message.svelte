<script lang="ts">
import { url } from "@roxi/routify";
</script>

<span>
  プレイリストが存在しません。
  <a href={$url("/playlist/new")}>こちら</a>
  で先にプレイリストを作成してください。
</span>

<script lang="ts">
import { url } from "@roxi/routify";
import ToastMessage from "./toast-message.svelte";
</script>

<ToastMessage type="info">
  プレイリストが存在しません。<br />
  <a href={$url("/playlist/new")}>こちら</a>
  で先にプレイリストを作成してください。
</ToastMessage>

<style lang="scss">
a {
  @apply font-bold underline;
}
</style>

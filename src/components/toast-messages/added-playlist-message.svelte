<script context="module" lang="ts">
export type Props = {
  name: string;
  id: string;
};
</script>

<script lang="ts">
import { url } from "@roxi/routify";
import ToastMessage from "./toast-message.svelte";

export let props: Props;
</script>

<ToastMessage type="success">
  プレイリスト <a href={$url(`/playlist/${props.id}`)}>{props.name}</a> に追加しました。
</ToastMessage>

<style lang="scss">
a {
  @apply font-bold underline;
}
</style>

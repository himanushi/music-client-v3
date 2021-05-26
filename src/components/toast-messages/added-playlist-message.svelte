<script context="module" lang="ts">
export type Props = {
  name: string;
  id: string;
};
</script>

<script lang="ts">
import { url } from "@roxi/routify";

export let props: Props;
</script>

<span>
  プレイリスト <a href={$url(`/playlist/${props.id}`)}>{props.name}</a> に追加しました。
</span>

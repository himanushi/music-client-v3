<script context="module" lang="ts">
export type Props = {
  name: string;
};
</script>

<script lang="ts">
export let props: Props;
</script>

<span>{props.name} にプレイリストを作成しました。</span>

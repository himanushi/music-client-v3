<script context="module" lang="ts">
export type Props = {
  text: string;
  type: "success" | "info" | "error";
};
</script>

<script>
import ToastMessage from "./toast-message.svelte";
export let props: Props;
</script>

<ToastMessage type={props.type}>
  {props.text}
</ToastMessage>

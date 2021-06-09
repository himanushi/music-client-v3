<script>
import ToastMessage from "./toast-message.svelte";
export let props: { text: string; type: "sucsses" | "info" | "error" };
</script>

<ToastMessage type={props.type}>
  {props.text}
</ToastMessage>

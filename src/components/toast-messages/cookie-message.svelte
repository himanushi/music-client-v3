<script>
import { url } from "@roxi/routify";
import ToastMessage from "./toast-message.svelte";
import { toasts } from "~/components/toasts.svelte";
import { cookie } from "~/lib/cookie";

const okClick = () => {

  cookie.set("cookieNotice", "true");
  toasts.close();

};
</script>

<ToastMessage type="info" {okClick}>
  クッキーポリシー<br />
  当サービスを利用することにより、当サービスの
  <a href={$url("/cookie-policy")} target="_blank">クッキーポリシー</a>
  に記載されたクッキーの使用に同意することとみなされます。
</ToastMessage>

<style lang="scss">
a {
  @apply font-bold underline;
}
</style>

<script lang="ts">
import CookieMessage from "~/components/toast-messages/cookie-message.svelte";
import { toasts } from "~/components/toasts.svelte";
import { cookie } from "~/lib/cookie";

if (cookie.get("cookieNotice") !== "true") {

  toasts.open({ component: CookieMessage });

}
</script>

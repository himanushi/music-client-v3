<script lang="ts">
import {
  onDestroy, onMount
} from "svelte";
import { cookie } from "~/lib/cookie";

let widgetId = 0;

const resetCookie = () => cookie.remove("reCAPTCHAv2Token");

export const reset = () => {

  resetCookie();
  grecaptcha.reset(widgetId);

};

const callback = (code: string) => {

  cookie.set("reCAPTCHAv2Token", code, { expires: 1 / 48 });

};

const expiredCallback = () => {

  resetCookie();

};

onMount(() => {

  resetCookie();
  widgetId = grecaptcha.render("g-recaptcha", {
    callback,
    "expired-callback": expiredCallback,
    sitekey: import.meta.env.SNOWPACK_PUBLIC_RECAPTCHA_KEY,
    theme: "dark"
  });

});

onDestroy(() => {

  resetCookie();

});
</script>

<div id="g-recaptcha" />

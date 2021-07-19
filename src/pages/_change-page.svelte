<script lang="ts">
// ページ遷移による scrollTop: 0 対策
import {
  afterPageLoad, beforeUrlChange
} from "@roxi/routify";
import { modals } from "~/components/modals.svelte";
import { googleAnalyticsId } from "~/lib/variable";
import { currentPath } from "~/store/history";
import { scrollLock } from "~/store/scroll-lock";

let content: HTMLElement | null;

$beforeUrlChange(() => {

  // modal 対応
  if ($modals.length > 0) {

    modals.close();

    return false;

  }

  scrollLock.update($currentPath, document.documentElement.scrollTop);

  return true;

});

$afterPageLoad(() => {

  document.documentElement.scrollTop = $scrollLock[window.location.href] || 0;
  currentPath.set(window.location.href);

  // Google Analytics
  if (googleAnalyticsId) {

    window.ga("set", "page", window.location.pathname);
    window.ga("send", "pageview");

  }

});
</script>

<span bind:this={content} style="display: none;" />

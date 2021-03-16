<script lang="ts">
  // ページ遷移による scrollTop: 0 対策
  import { afterPageLoad, beforeUrlChange } from "@roxi/routify";
  import { createEventDispatcher } from "svelte";
  import { currentPath } from "~/store/history";
  import { scrollLock } from "~/store/scroll-lock";

  let content: HTMLElement;
  const dispatch = createEventDispatcher();

  $beforeUrlChange(() => {

    dispatch("pageChange");

    scrollLock.update((object) => {

      if (content.parentElement) {

        object[$currentPath] = content.parentElement.scrollTop;
  
      }

      return object;
  
    });

    return true;

  });

  $afterPageLoad(() => {

    dispatch("pageLoad");

    if (content.parentElement) {

      content.parentElement.scrollTop =
        $scrollLock[window.location.pathname] || 0;

      currentPath.set(window.location.pathname);
  
    }

  });
</script>

<span bind:this={content} style="display: none;" />

<script>
  import {afterPageLoad, beforeUrlChange} from "@roxi/routify";
  import {currentPath} from "~/store/history";
  import {scrollLock} from "~/store/scroll-lock";

  let content: HTMLElement;

  $beforeUrlChange(() => {

    scrollLock.update((object) => {

      if (content.parentElement) {

        object[$currentPath] = content.parentElement.scrollTop;
  
      }

      return object;
  
    });

    return true;

  });

  $afterPageLoad(() => {

    if (content.parentElement) {

      content.parentElement.scrollTop =
        $scrollLock[window.location.pathname] || 0;

      currentPath.set(window.location.pathname);
  
    }

  });
</script>

<div bind:this={content} data-routify="scroll-lock">
  <slot>contetnt</slot>
</div>

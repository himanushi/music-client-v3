<script lang="ts">
import "~/app.css";

import { Router } from "@roxi/routify";
import { routes } from "routify/routes";
import { onMount } from "svelte";

onMount(() => {

  // ref: https://css-tricks.com/the-trick-to-viewport-units-on-mobile
  const resize = () => {

    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

  };
  window.addEventListener("resize", resize);
  resize();

});
</script>

<Router {routes} />

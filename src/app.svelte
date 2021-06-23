<script lang="ts">
import "~/app.css";
import { Router } from "@roxi/routify";
import { routes } from "routify/routes";
import { onMount } from "svelte";
import { viewportService } from "~/machines/viewport-machine";

onMount(() => {

  viewportService.send("INIT_RESIZE");

});
</script>

<Router {routes} />

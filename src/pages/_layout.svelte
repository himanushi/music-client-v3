<script lang="ts">
import { setClient } from "svelte-apollo";
import Content from "./_content.svelte";
import Footer from "./_footer.svelte";
import Header from "./_header.svelte";
import Initializer from "~/components/initializers/initializer.svelte";
import Modals from "~/components/modals.svelte";
import Toasts from "~/components/toasts.svelte";
import client from "~/graphql/client";

setClient(client);
</script>

<Initializer />
<Header />
<Content><slot /></Content>
<Footer />
<Modals />
<Toasts />

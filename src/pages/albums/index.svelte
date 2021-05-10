<script lang="ts">
import { params } from "@roxi/routify";
import Albums from "./_albums.svelte";
import type {
  conditonsType, sortType
} from "./_albums.svelte";
import SearchBar from "./_search-bar.svelte";
import SearchDetailButton from "./_search-detail-button.svelte";
import type { Mutable } from "~/@types/extends";
import type { AlbumsQueryVariables } from "~/graphql/types";
import buildParameters from "~/lib/build-parameters";

let conditions: conditonsType = {};
let sort: sortType = {};

$: {

  const parameters = buildParameters<Mutable<AlbumsQueryVariables>>(
    "album",
    $params
  );

  conditions = parameters.conditions || {};
  sort = parameters.sort || {};

}
</script>

<SearchBar />
<SearchDetailButton />

<div class="albums">
  <Albums {conditions} {sort} />
</div>

<style>
.albums {
  @apply flex flex-wrap;
}
</style>

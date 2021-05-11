<script lang="ts">
import { params } from "@roxi/routify";
import type {
  conditonsType, sortType
} from "./_artists.svelte";
import Artists from "./_artists.svelte";
import SearchBar from "./_search-bar.svelte";
import SearchDetailButton from "./_search-detail-button.svelte";
import type { Mutable } from "~/@types/extends";
import type { ArtistsQueryVariables } from "~/graphql/types";
import buildParameters from "~/lib/build-parameters";

let conditions: conditonsType = {};
let sort: sortType = {};

$: {

  const parameters = buildParameters<Mutable<ArtistsQueryVariables>>(
    "artist",
    $params
  );

  conditions = parameters.conditions || {};
  sort = parameters.sort || {};

}
</script>

<SearchBar />
<SearchDetailButton />

<div class="artists">
  <Artists {conditions} {sort} />
</div>

<style>
.artists {
  @apply flex flex-wrap;
}
</style>

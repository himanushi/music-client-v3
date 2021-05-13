<script lang="ts">
import { params } from "@roxi/routify";
import Playlist from "./_playlists.svelte";
import type {
  conditonsType, sortType
} from "./_playlists.svelte";
import SearchBar from "./_search-bar.svelte";
import SearchDetailButton from "./_search-detail-button.svelte";
import type { Mutable } from "~/@types/extends";
import type { PlaylistsQueryVariables } from "~/graphql/types";
import buildParameters from "~/lib/build-parameters";

let conditions: conditonsType = {};
let sort: sortType = {};

$: {

  const parameters = buildParameters<Mutable<PlaylistsQueryVariables>>(
    "playlist",
    $params
  );

  conditions = parameters.conditions || {};
  sort = parameters.sort || {};

}
</script>

<SearchBar />
<SearchDetailButton />

<div class="playlist">
  <Playlist {conditions} />
</div>

<style>
.playlist {
  @apply flex flex-wrap;
}
</style>

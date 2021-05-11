<script lang="ts">
import IconButton from "~/components/icon-button.svelte";
import type { Track } from "~/graphql/types";
import AddPlaylistIcon from "~/icons/add-playlist.svelte";

export let track: Track;
</script>

<IconButton>
  <AddPlaylistIcon />
</IconButton>

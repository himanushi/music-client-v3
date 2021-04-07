<script lang="ts">
  import AddPlaylistItems from "./_add-playlist-items.svelte";
  import { modal } from "~/components/modal.svelte";

  const onClick = () => modal.set(AddPlaylistItems);
</script>

<button on:click={onClick}>追加</button>

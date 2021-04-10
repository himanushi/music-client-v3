<script lang="ts">
import { mutation } from "svelte-apollo";
import { modal } from "~/components/modal.svelte";
import { UpsertPlaylistDocument } from "~/graphql/types";
import type { UpsertPlaylistMutationVariables } from "~/graphql/types";

const upsertPlaylist = mutation<unknown, UpsertPlaylistMutationVariables>(
  UpsertPlaylistDocument
);

let name = "";

const handleSubmit = async () => {

  try {

    const result = await upsertPlaylist({
      "variables": {
        "input": {
          "description": "",
          name,
          "playlistId": "pst17610da071d52",
          "publicType": "NO_NAME_OPEN",
          "trackId": "trk171f7d2f4be0b",
          "trackIds": ["trk171f7d2f4be0b"]
        }
      }
    });

    console.log({ result });

    modal.set(null);

  } catch (error) {

    console.log({ error });

  }

};
</script>

<div on:click|stopPropagation>
  <input type="text" bind:value={name} />
  <button on:click={handleSubmit}>登録</button>
</div>

<style lang="scss">
div {
  @apply h-full w-full bg-gray-500;
}
</style>

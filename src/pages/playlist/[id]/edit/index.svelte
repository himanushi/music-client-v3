<script lang="ts">
import { goto } from "@roxi/routify";
import {
  mutation, query
} from "svelte-apollo";
import Button from "~/components/button.svelte";
import DndSelection from "~/components/dnd-selection.svelte";
import type { ItemsType } from "~/components/dnd-selection.svelte";
import InputSelection from "~/components/input-selection.svelte";
import InputText from "~/components/input-text.svelte";
import InputTextarea from "~/components/input-textarea.svelte";
import PlayButton from "~/components/play-button.svelte";
import Text from "~/components/text.svelte";
import {
  PlaylistDocument, UpsertPlaylistDocument
} from "~/graphql/types";
import type {
  Playlist,
  PlaylistQuery,
  PlaylistPublicTypeEnum,
  UpsertPlaylistMutationVariables
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id = "";

let name = "";
let description = "";
let publicType: PlaylistPublicTypeEnum = "NON_OPEN";
let initialize = true;
let items: ItemsType = [];
let messages: Record<string, string[]> = {};

const playlistQuery = query<PlaylistQuery>(PlaylistDocument, {
  fetchPolicy: "no-cache",
  variables: { id }
});

// 初期化
let playlist: Playlist;
$: if ($playlistQuery.data?.playlist && initialize) {

  playlist = $playlistQuery.data.playlist as Playlist;

  ({
    name, description, publicType
  } = playlist);

  items = playlist.items.map((it, index) => ({
    id: index,
    index,
    item: it.track
  }));

  initialize = false;

}

const upsertPlaylist = mutation<unknown, UpsertPlaylistMutationVariables>(
  UpsertPlaylistDocument
);

const update = async () => {

  try {

    await upsertPlaylist({ variables: { input: {
      description,
      name,
      playlistId: id,
      publicType,
      trackIds: items.map((it) => it.item.id)
    } } });

    $goto("/playlist/:id", { id });

  } catch (error) {

    messages = errorMessages(error);

  }

};

const changeItems = (
  event: CustomEvent & {
    detail: { items: any[] };
  }
) => {

  ({ items } = event.detail);

};

const publicTypes = [
  {
    label: "非公開",
    value: "NON_OPEN"
  },
  {
    label: "公開",
    value: "OPEN"
  },
  {
    label: "匿名公開",
    value: "ANONYMOUS_OPEN"
  }
];

const meq = meQuery();
$: me = $meq?.data?.me;
</script>

{#if me && isAllowed(me, "upsertPlaylist") && playlist && me.username === playlist?.author?.username}
  <form on:submit|preventDefault>
    <div class="info">
      <InputText
        label="タイトル"
        bind:value={name}
        errorMessages={messages.name}
      />
      <InputTextarea
        label="説明"
        class="h-80"
        bind:value={description}
        errorMessages={messages.description}
      />
      <InputSelection
        label="公開設定"
        bind:value={publicType}
        items={publicTypes}
      />
    </div>

    <div class="items">
      <DndSelection
        on:remove={changeItems}
        on:decide={changeItems}
        {items}
        let:item
        let:index
        class={"max-h-[500px]"}
      >
        <span class="item">
          <span class="icon">
            <PlayButton {name} {index} tracks={items.map((it) => it.item)} />
          </span>
          <Text>{item.item.name}</Text>
        </span>
      </DndSelection>
    </div>

    <Button class="text-center" on:click={update} messages={messages._}>
      保存
    </Button>
  </form>
{/if}

<style lang="scss">
form {
  @apply text-white flex flex-col space-y-5 pb-3;

  .info {
    @apply m-7 flex flex-col space-y-5;
  }

  .items {
    .item {
      @apply flex flex-row items-center;

      .icon {
        @apply m-2;
      }
    }
  }
}
</style>

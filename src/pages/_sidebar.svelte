<script lang="ts">
import { goto } from "@roxi/routify";
import { fly } from "svelte/transition";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import Player from "~/components/player.svelte";
import Text from "~/components/text.svelte";
import ChevronLeft from "~/icons/chevron-left.svelte";
import Disc from "~/icons/disc.svelte";
import Live from "~/icons/live.svelte";
import MusicNote from "~/icons/music-note.svelte";
import Music from "~/icons/music.svelte";
import PlaylistSearch from "~/icons/playlist-search.svelte";
import User from "~/icons/user.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

const close = () => modals.close();

const showPlayer = () => {

  modals.close();
  modals.open(Player);

};

const go =
  (path: string, params: Record<string, string> = {}) => () => {

    modals.close();
    $goto(path, params);

  };

const myPlaylist = [
  "playlists",
  "upsertPlaylist",
  "addPlaylistItems"
];

const query = meQuery();
$: me = $query?.data?.me;
</script>

<nav
  on:click|stopPropagation
  transition:fly={{
    duration: 200,
    opacity: 100,
    x: -288
  }}
>
  <header>
    <IconButton class="h-10 w-10" on:click={close}>
      <ChevronLeft class="text-black h-5 w-5" />
    </IconButton>
    <h4>メニュー</h4>
  </header>
  <main>
    <section>
      <h5>Search</h5>
      <ul>
        {#if me && isAllowed(me, "artists")}
          <li class="clickable" on:click={go("/artists")}>
            <User class="h-5 w-5" /><Text>アーティスト</Text>
          </li>
        {/if}
        {#if me && isAllowed(me, "albums")}
          <li class="clickable" on:click={go("/albums")}>
            <Disc class="h-5 w-5" /><Text>アルバム</Text>
          </li>
        {/if}
        {#if me && isAllowed(me, "tracks")}
          <li class="clickable" on:click={go("/tracks")}>
            <MusicNote class="h-5 w-5" /><Text>曲</Text>
          </li>
        {/if}
        {#if me && isAllowed(me, "radios")}
          <li class="clickable" on:click={go("/radios")}>
            <Live class="h-5 w-5" /><Text>ラジオ</Text>
          </li>
        {/if}
        {#if me && isAllowed(me, "tracks")}
          <li class="clickable" on:click={go("/tracks/random")}>
            <PlaylistSearch class="h-5 w-5" /><Text>おまかせプレイリスト</Text>
          </li>
        {/if}
        {#if me && isAllowed(me, "playlists")}
          <li class="clickable" on:click={go("/playlist")}>
            <PlaylistSearch class="h-5 w-5" /><Text>みんなのプレイリスト</Text>
          </li>
        {/if}
        {#if me && isAllowed(me, myPlaylist)}
          <li class="clickable" on:click={go("/playlist", { pm: "1" })}>
            <PlaylistSearch class="h-5 w-5" /><Text>マイプレイリスト</Text>
          </li>
        {/if}
        <h5>Setting</h5>
        <li class="clickable" on:click={go("/me")}>
          <User class="h-5 w-5" /><Text>設定</Text>
        </li>
        <li class="clickable" on:click={showPlayer}>
          <Music class="h-5 w-5" /><Text>ミュージックプレイヤー</Text>
        </li>
        <h5>About</h5>
        <li class="clickable" on:click={go("/about")}>このサイトについて</li>
        <li class="clickable" on:click={go("/terms")}>利用規約</li>
        <li class="clickable" on:click={go("/privacy")}>
          プレイバシーポリシー
        </li>
        <li class="clickable" on:click={go("/cookie-policy")}>
          クッキーポリシー
        </li>
      </ul>
    </section>
  </main>
</nav>

<style lang="scss">
nav {
  @apply w-72 h-full;
  @apply bg-opacity-100;

  header {
    @apply h-14 flex items-center bg-teal-500 px-2;

    h4 {
      @apply text-black text-lg;
    }
  }

  main {
    @apply bg-gray-900 text-white text-base h-full p-5 overflow-y-scroll;

    h5 {
      @apply m-1 text-base text-gray-500 border-b-2 border-gray-600;
    }

    li {
      @apply p-2 text-sm rounded flex flex-row items-center space-x-2;
    }
  }
}
</style>

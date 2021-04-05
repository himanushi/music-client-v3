<script lang="ts">
  import { goto } from "@roxi/routify";
  import { SearchParams } from "~/lib/params";
  import type { SearchParamsType } from "~/lib/params";

  let value: string;

  const search = () => {

    const params: SearchParamsType = {};
    params[SearchParams.albums.name] = value;

    $goto("./", params);

  };
</script>

<form on:submit|preventDefault>
  <input type="text" bind:value placeholder="検索したいこと..." />
  <button on:click={search}>検索</button>
</form>

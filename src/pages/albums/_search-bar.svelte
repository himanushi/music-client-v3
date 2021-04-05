<script lang="ts">
  import { goto, params } from "@roxi/routify";
  import { SearchParams } from "~/lib/params";
  import type { SearchParamsType } from "~/lib/params";

  let value: string = $params[SearchParams.albums.name];

  const search = () => {

    const parameters: SearchParamsType = {};
    parameters[SearchParams.albums.name] = value;

    $goto("./", parameters);

  };
</script>

<form on:submit|preventDefault>
  <input type="text" bind:value placeholder="検索したいこと..." />
  <button on:click={search}>検索</button>
</form>

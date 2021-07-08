<script>
import SearchButton from "./search-button.svelte";

export let name: string;
name = name.replaceAll(/\s/giu, "+");
</script>

<SearchButton
  class="bg-green-500 text-white"
  href={`https://music.line.me/webapp/search/tracks?query=${name}`}
>
  Line Music で検索
</SearchButton>

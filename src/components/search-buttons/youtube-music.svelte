<script>
import SearchButton from "./search-button.svelte";

export let name: string;
name = name.replaceAll(/\s/giu, "+");
</script>

<SearchButton
  class="bg-red-500"
  href={`https://music.youtube.com/search?q=${name}`}
>
  Youtube Music で検索
</SearchButton>

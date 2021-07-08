<script>
import SearchButton from "./search-button.svelte";

export let name: string;
name = name.replaceAll(/\s/giu, "+");
</script>

<SearchButton
  class="bg-white"
  href={`https://amazon.co.jp/s?i=digital-music&k=${name}`}
>
  Amazon Music で検索
</SearchButton>

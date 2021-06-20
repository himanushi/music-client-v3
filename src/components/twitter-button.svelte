<script>
import IconButton from "~/components/icon-button.svelte";
import Twitter from "~/icons/twitter.svelte";

export let path: string;
export let title: string;
export let hashtags: string[];

// ref: https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
const url = `https://video-game-music.net${path}`;
let twitterUrl = "https://twitter.com/intent/tweet";
twitterUrl += `?text=${title} - ゲーム音楽`;
twitterUrl += `&url=${url}`;
twitterUrl += `&hashtags=${hashtags.join(",")}`;
</script>

<a href={twitterUrl} target="_blank">
  <IconButton class="w-10 h-10">
    <Twitter class="w-8 h-8 text-white" />
  </IconButton>
</a>

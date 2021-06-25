<script lang="ts">
import Button from "~/components/button.svelte";
import Markdown from "~/components/markdown.svelte";
import { markdown } from "~/lib/markdown";
import {
  currentVersion, reset
} from "~/lib/version";

const version = currentVersion() || "";

const html = markdown(`
# このサイトについて
## 概要
音楽サブスクリプション配信中のゲーム音楽を検索できるサイトです。

## 目的
私が新しいゲーム音楽に出会うために公開しています。ユーザー同士でゲーム音楽を楽しく共有できるよう開発を進めています。

## SNS, 開発プロジェクトなど
* [Twitter](https://twitter.com/vgm_net)
* [note](https://note.com/himanushi/n/nd598a3d92a15)
* [Github](https://github.com/users/himanushi/projects/2)

## 問い合わせ
[Twitter にてダイレクトメッセージをお願いします](https://twitter.com/vgm_net)

#### ファイルバージョン
${version}

#### リセット
再生されないなどの不具合がある場合は下のボタンをクリックしてください。
`);
</script>

<Markdown class="m-7">
  {@html html}
</Markdown>

<Button on:click={reset} class="text-center mb-5">リセット</Button>

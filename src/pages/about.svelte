<script lang="ts">
import { markdown } from "~/lib/markdown";

const html = markdown(`
# このサイトについて
## 概要
音楽サブスクリプション配信中のゲーム音楽を検索できるサイトです。非商用で公開しています。
## 目的
私が新しいゲーム音楽に出会うために公開しています。ユーザー同士でゲーム音楽を楽しく共有できるよう開発を進めています。
## SNS, 開発プロジェクトなど
* [Twitter](https://twitter.com/vgm_net)
* [note](https://note.com/himanushi/n/nd598a3d92a15)
* [Github](https://github.com/users/himanushi/projects/2)
## 問い合わせ
[Twitter にてダイレクトメッセージをお願いします](https://twitter.com/vgm_net)
`);
</script>

{@html html}

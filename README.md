## 概要
Google Apps Script で部活の予定をライン（グループ）、Twitter、Slackで呟くボットを作成

## 工夫した点
変数名のスコープや可読性を意識して極力、処理（関数）をクラス内で定義して呼び出すようにした。
これにより他の場所での再利用がしやすくなりDRYの原則が保たれている。

##注意点
[TwitterAPIとアカウント凍結についてのガイドライン](https://blog.twitter.com/developer/ja_jp/topics/tools/2018/at_mul.html)

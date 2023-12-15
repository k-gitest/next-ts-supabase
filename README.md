## 目的
next.jsを使用してCMSプラットフォームを構築する技術選定における検証である。

next.jsはver.13.4からApp dirを正式採用しており、今後のバージョンアップに備えApp dirのroutesとapiの動作を確認していく。

## 課題
まずfirebaseを使用してapp dirの動作確認を行ったがfirebaseに接続時にエラーが発生し、クライアントコンポーネントとサーバーコンポーネントの分け方に問題があるとなっていた。しかし単純なコードでも同様のエラーが出現し先に進まない。

firebaseでは挙動がおかしいのでsupabaseの勉強がてらapp dirの動作確認をした。

## app概要
create-next-appで構築されたNext.jsのapp dirを使用しsupabaseを利用したCMSプロジェクトです。

* supabaseなのでDBはPostgreSQL BaaSに接続する

[ベースappはコチラ](https://github.com/k-gitest/next-ts-fire-auth-store-cms-onClient)

## 開発環境

* next 13.4.9
* typescript 5.1.6
* supabase 2.26.0
* prisma 5.0.0

## ディレクトリ構成

<pre>
myapp...プロジェクトディレクトリ
  ├── components ...呼び出し用コンポーネントファイル
  │     ├── FormParts ...フォーム用コンポーネント
  │     ├── Private ...ログインユーザー向けコンポーネント
  │     ├── Layout ...メインレイアウト
  │     └── provider ...ユーザー認証チェック
  ├── lib ...supabaseなど外部設定ファイル
  ├── app ...メインディレクトリ
  │     ├── api ...サーバー側処理
  │     ├── login ...ログイン画面
  │     ├── signup ...登録画面
  │     └── user ...会員向け画面
  │           └── profile ...会員情報画面
  ├── public ...画像ファイル
  └── types ...型定義ファイル
</pre>

## 注意点

app dirの場合、各ディレクトリのindexはpage.tsxとなり、apiを使用するにはroute.tsを作成する必要がある。その為、画面毎にpage.tsxを作成しなければならずディレクトリが増える。

従来のstylesディレクトリはなくなりapp dirのルートにあるglobals.cssで設定し、_appや_documentは廃止されlayout.tsxで設定する。
NextResponseなどはnextからではなくnext/serverから取得する。
useRouterはnext/routerからではなくnext/navigationから取得する。

基本的にサーバーコンポーネントであり"use client"を書くとクライアントコンポーネントになる。useStateやuseEffectなどライフサイクルを使用する場合はクライアントコンポーネントとなる。

## 結論

next13のapp dirをfirebaseで使用した時の不具合や不自然な挙動に対して、supabaseではapp dirでも問題なく動作した。認証チェックも問題なく実装できた。

supabaseのDBへの接続はバージョンによって書き方が異なるが、現状ではどのバージョンの書き方でも接続可能であった。その為、どのバージョンで書くか統一した方が良いと感じる。

親がクライアントで子がサーバーと混在しても特にエラーはでないが、どちらでレンダリングしているのか分かり難い部分がある。

現時点でnext14になっており、バージョンアップの頻度が高く今後も変更が加えられる可能性が高い。その為、本番環境への実装はちょっと考え物である。

supabaseに関してはfirebaseよりもnext.jsとの相性が良いと感じる。今後も使っていきたいと思う。


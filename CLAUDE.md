# CLAUDE.md

このファイルは Claude Code が毎セッション自動で読み込む。コンテキストが空の状態でも
ここだけ読めば作業を再開できるように、このリポジトリ固有の手順を書き残しておく。

## このリポジトリ

武蔵野大学データサイエンス学部 タダ ユウリ の個人サイト（Next.js App Router / TypeScript /
Tailwind）。日本語が原本で、英語はその訳。UI 文言も記事も **必ず日英そろえて更新する**。

- `src/app/` … ルーティング（`/`, `/blog`, `/blog/[slug]`, `/documents`, `/documents/[slug]`）
- `src/components/` … トップページの各セクション。`t = { jp: {...}, en: {...} }` の形で
  日英の文言をコンポーネント内に直書きしている
- `content/blog/*.md` … 日本語記事（原本）／`content/blog/en/*.md` … 英語記事
- `content/documents/*.md` … PDF 資料ページ（スライド・論文・ポスター）
- `public/photos/<slug>/` … 記事に載せる画像（コミット対象）
- `public/slides/*.pdf` … 公開する PDF

`content/photo/`, `content/pdf/`, `content/_raw/`, ルート直下の `/docs` は **gitignore 済み**。
元データ置き場なのでコミットしない（`.gitignore` の該当箇所にも理由を書いてある）。

## ブログ記事を追加するときのフロー

### 1. 下書きを探す

新しい記事を頼まれたら、まず `content/_raw/` を見る。Notion からエクスポートした下書きが
置かれていることが多く、それが本文の原典になる。下書きがあれば内容を勝手に創作せず、
**下書きに書かれていない事実（プロダクト名・数字・固有名詞）を補わない**。不明点は聞く。

### 2. slug と日付を決める

- slug は `YYYY-MM-DD-<英小文字ケバブケース>`（例: `2026-09-19-giikuhaku-2026`）
- 日付は「出来事があった日」。公開日ではない
- 記事・英語版・画像ディレクトリの3つで同じ slug を使う

### 3. 本文を日英2ファイル書く

`content/blog/<slug>.md`（日本語＝原本）と `content/blog/en/<slug>.md`（英語）。
英語版が無い記事は日本語版で代替表示されるが、新規記事は英語版まで書く。

frontmatter:

```yaml
---
title: "記事タイトル"
date: "2026-09-19"          # 日英で同じ値
tags: ["技育博", "MIRAIS", "イベントレポート"]
summary: "一覧カードとOGに出る要約。1〜2文。"
# --- 以下は必要なときだけ ---
slides: "/slides/xxx.pdf"    # 記事末尾に添付表示されるPDF
slidesTitle: "スライドの見出し"
docs:                        # 複数のPDFを並べるとき
  - href: "/slides/xxx.pdf"
    title: "論文：…"
series: "mirais"             # 連載のとき。同じ series の記事がまとめられる
seriesOrder: 1
seriesTitle: "MIRAIS 設計・実装記録"
seriesLabel: "第 1 回 企画編"
---
```

`slug`・`date`・`slides`・`series` は **日本語版が正**（`src/lib/blog.ts` 参照）。
`series` を付けた記事はトップページの Blog 枠から除外される（連載が枠を埋めないため）。

### 4. 画像を公開用に変換する

元画像は `content/photo/…` にある。EXIF に GPS や端末情報が入っているため、**そのまま
コミットしない**。必ず変換したコピーを `public/photos/<slug>/` に置く:

```bash
mkdir -p public/photos/<slug>
magick 元画像.jpeg -auto-orient -resize '1600x1600>' -strip -quality 82 \
  public/photos/<slug>/<名前>.jpg
```

`-strip` が EXIF（GPS 含む）を全削除する。本文からは `/photos/<slug>/<名前>.jpg` で参照する。

**画像には alt とキャプションを必ずセットで付ける。** 1枚の例外もなく、次の形で書く:

```markdown
![何が写っているかの説明（alt）](/photos/<slug>/xxx.jpg)

*▲ キャプション*
```

- alt … 画像が表示されない人・読み上げる人向けに、**写っているものを具体的に**書く。
  ファイル名から推測して書かない。分からなければ画像を実際に開いて確認する
- キャプション … 読者に向けた説明や一言。`*▲ ` で始める
- 両者は役割が違うので、同じ文言をコピーしない

画像ファイル名は元データ（`content/photo/<イベント名>/`）の名前をそのまま引き継ぐ。
元データ側の名前が変わったら `public/photos/` 側も `git mv` で合わせ、記事の参照も直す。

### 5. 本文中のリンクは自動で埋め込みになる

記事の段落や箇条書きに次のリンクがあると、`BlogMarkdown` がそれを検出して、その段落の
直後にプレイヤー／カードを描画する。Markdown 側で特別な記法を書く必要はなく、
**普通のリンクとして貼るだけでよい**。

| リンク | 埋め込み | 実装 |
| --- | --- | --- |
| YouTube（`youtu.be/…`, `youtube.com/watch?v=…`, `/shorts/`, `/live/`） | プレイヤー | `src/components/YouTubeEmbed.tsx` |
| X（`x.com/<user>/status/<id>`, `twitter.com/…`） | 投稿カード | `src/components/XEmbed.tsx` |

- リンク自体は本文に残る。埋め込みが読み込めなくても文章として成立させるため
- X は `platform.twitter.com/widgets.js` をページごとに1回だけ読み込む。削除済み・非公開の
  投稿ではカードが高さ0のまま残るので、実際に高さを持つまでは投稿へのリンクを表示したままにしている
- URL の解析（`src/lib/x-post.ts`）は `BlogMarkdown` がサーバー側で走る都合上、client
  コンポーネントの外に置くこと。client コンポーネントから export した関数はサーバーから
  呼べずビルドが落ちる

### 6. 記事に紐づけて Works / About を更新する

記事を足しただけでは載らない。実績を伴う記事なら、対応するセクションまで直す。

**`src/components/WorksSection.tsx`** — `timeline` 配列に追記（**jp と en の両方**）:

```ts
{
  date: '2026.09',
  title: '技育博2026 Vol.2 — 企業賞2冠（SHIFT・DeNA）',
  description: '…',
  type: 'award',        // award | talk | event | career | conference
  highlight: true,      // 「ハイライト」タブに出す。すべての実績は type 問わず「すべて」に出る
  link: 'https://…',    // イベントページ（外部・別タブ）
  docs: [{ label: '参加記', href: '/blog/<slug>', icon: 'fas fa-pen-nib' }],
}
```

- 記事への導線は `docs` タグで張る（`icon` 省略時は PDF アイコンになるので、記事は
  `fas fa-pen-nib` を指定する）
- プロダクトの記事なら `projects` 側のカードの `links` からも張って双方向にする
- `talk` には自動で「イベント」バッジも付く（`badgeTypes()`）。手で両方書く必要はない

**`src/components/AboutSection.tsx`** — `stats` の数字（イベント参加・登壇・ハッカソン・受賞）
を jp と en の両方で更新する。数字の指示は本人から出るので勝手に数えない。

### 7. 検証

```bash
npx tsc --noEmit
npx next build      # /blog/<slug> が静的生成されていることを確認
```

## ブランチとコミット

- **main へ直接コミット・直接マージしない。** 必ずトピックブランチを切り、PR 経由でマージする
- 依頼の中に「別件」が混ざっていたら、**別ブランチ・別 PR に分ける**
- ブランチ名は `feat/…`, `fix/…`, `change/…`, `docs/…`
- コミットメッセージは `feat: 日本語の要約` 形式。prefix は `feat`（追加）/ `change`（既存の
  変更）/ `fix`（修正）を使い分ける。本文で「なぜ」を説明する

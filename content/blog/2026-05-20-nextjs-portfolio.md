---
title: "Next.js 15でポートフォリオサイトを作った"
date: "2026-05-20"
tags: ["Next.js", "React", "技術"]
summary: "ポートフォリオサイトをNext.js 15 + Tailwind CSS 4 + Framer Motionで作り直しました。設計の考え方や詰まったポイントをまとめます。"
---

# Next.js 15でポートフォリオサイトを作った

既存のポートフォリオサイトをフルリニューアルしました。

## 技術選定

| 項目 | 採用技術 | 理由 |
|------|----------|------|
| フレームワーク | Next.js 15 | App Router の安定性、SSG対応 |
| スタイリング | Tailwind CSS 4 | 開発速度、メンテナンス性 |
| アニメーション | Framer Motion | 宣言的に書けて直感的 |
| デプロイ | AWS Amplify | GitHubと連携した自動デプロイ |

## 設計で意識したこと

### シングルページ構成

研究・スキル・経歴など複数のセクションがあるため、SPA構成にしました。`#about` などのアンカーリンクでスムーズスクロールを実現しています。

### 多言語対応

日本語・英語を切り替えられる仕組みを React Context で実装しました。

```tsx
const { lang } = useLanguage() // 'jp' | 'en'
```

各コンポーネント内でオブジェクトを使って言語切り替えに対応しています。

### Framer MotionのwhileInView

セクションをスクロールして表示したときにフェードインするアニメーションは `whileInView` で実装しています。

```tsx
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6 }}
>
```

## 詰まったポイント

**Tailwind CSS 4 の設定**

Tailwind 4 からは `tailwind.config.js` が廃止され、CSS ファイル内の `@theme` ディレクティブで設定するようになりました。最初は戸惑いましたが、慣れると直感的です。

```css
@theme {
  --color-primary: #00d8ff;
}
```

## 今後の改善点

- ブログ機能の追加（今まさにやっています）
- Lighthouse スコアの改善
- OGP 画像の自動生成

まだまだ改善できる部分がたくさんあります。少しずつアップデートしていきます。

# ベースイメージは変更なし
FROM node:22-slim

# 作業ディレクトリを設定
WORKDIR /app

# ★改善点1: apt-get upgradeは開発環境では必須ではないため削除。ビルド時間を短縮します。
# もし`git`など特定のツールが必要な場合は、ここで`apt-get install`します。
# RUN apt-get update && apt-get install -y git

# 依存関係のキャッシュを効かせるため、package*.jsonを先にコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ★改善点2: ソースコードのCOPY命令をすべて削除
# ソースコードはボリュームマウントでコンテナに提供するため、イメージに含める必要がありません。
# COPY src ./src
# COPY public ./public

# コンテナ起動時に開発サーバーを起動
CMD ["npm", "run", "dev"]
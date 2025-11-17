# Makefile for Your Project / プロジェクト用 Makefile

.PHONY: help up down clean logs logs-fe build restart ps sh-fe install-fe setup

help:
	@echo "----------------------------------------------------"
	@echo " プロジェクト用 Makefile / Makefile for Your Project"
	@echo "----------------------------------------------------"
	@echo " help        - ヘルプを表示 / Show this help"
	@echo " up          - すべてのサービスをデタッチモードで起動 / Start all services in detached mode"
	@echo " down        - すべてのサービスを停止・削除 / Stop and remove all services"
	@echo " clean       - composeで作成されたコンテナ・ローカルイメージ・ボリューム・ネットワークを削除 / Remove containers, local images, volumes and networks created by compose"
	@echo " setup       - クリーンセットアップ: 起動 / Clean setup: up"
	@echo " logs        - 全サービスのログを表示 / View logs from all services"
	@echo " logs-fe     - フロントエンドのログを表示 / View frontend logs"
	@echo " build       - サービスをビルド／再ビルド / Build or rebuild services"
	@echo " restart     - すべてのサービスを再起動 / Restart all services"
	@echo " ps          - 実行中のコンテナ一覧を表示 / List running containers"
	@echo " sh-fe       - フロントエンドコンテナのシェルに入る (/bin/sh) / Enter frontend container shell (/bin/sh)"
	@echo " install-fe  - フロントエンドの依存関係をインストール（npm install） / Install frontend dependencies (npm install)"
	@echo "----------------------------------------------------"

up: # Start all services in detached mode / すべてのサービスをデタッチモードで起動
	docker-compose up -d

down: # Stop and remove all services / すべてのサービスを停止・削除
	docker-compose down

clean: # Remove containers, local images, volumes and networks created by compose / composeで作成されたコンテナ・ローカルイメージ・ボリューム・ネットワークを削除
	docker-compose down --rmi all -v --remove-orphans

setup: clean up # Clean setup: up / クリーンセットアップ: 起動

logs: # View logs from all services / 全サービスのログを表示
	docker-compose logs -f

logs-fe: # View frontend logs / フロントエンドのログを表示
	docker-compose logs -f next-app

build: # Build or rebuild services / サービスをビルド／再ビルド
	docker-compose build

restart: # Restart all services / すべてのサービスを再起動
	docker-compose restart

ps: # List running containers / 実行中のコンテナ一覧を表示
	docker-compose ps

sh-fe: # Enter frontend container shell (/bin/sh) / フロントエンドコンテナのシェルに入る (/bin/sh)
	docker-compose exec next-app /bin/sh

install-fe: # Install frontend dependencies (npm install) / フロントエンドの依存関係をインストール（npm install）
	docker-compose run --rm next-app npm install

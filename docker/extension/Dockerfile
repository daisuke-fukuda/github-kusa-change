# ベースイメージを指定
FROM node:12-alpine

# node.js の環境変数を定義する
# 本番環境では production
ENV NODE_ENV=development

# 雛形を生成するのに必要なパッケージのインストール
#sRUN npm install -g express-generator@4.16.0

# ディレクトリを移動する
WORKDIR /extension

# ポート3000番を開放する
EXPOSE 3000
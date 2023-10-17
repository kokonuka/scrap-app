# scrap-app

### 開発

#### Backend

開発サーバー起動

```
npm run dev
```

#### Infrastructure

DynamoDB Local 起動

```
docker-compose up -d
```

dynamodb-admin

`http://localhost:8001/`

### デプロイ

#### Backend

ソースコードビルド

```
npm run build
```

#### Infrastructure

リソースデプロイ

```
cdk deploy
```

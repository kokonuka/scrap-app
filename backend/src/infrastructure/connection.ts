import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const config: DynamoDBClientConfig = {
  endpoint: "http://localhost:8000",
  // region: "ap-northeast-1",
  // credentials: { accessKeyId: "FAKE", secretAccessKey: "FAKE" },
};
const dbClient = new DynamoDBClient(config);
export const documentClient = DynamoDBDocumentClient.from(dbClient);

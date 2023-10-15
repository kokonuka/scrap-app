import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

require("dotenv").config();

const config: DynamoDBClientConfig =
  process.env.NODE_ENV === "development"
    ? {
        endpoint: "http://localhost:8000",
      }
    : {
        region: "ap-northeast-1",
      };

const dbClient = new DynamoDBClient(config);
export const documentClient = DynamoDBDocumentClient.from(dbClient);

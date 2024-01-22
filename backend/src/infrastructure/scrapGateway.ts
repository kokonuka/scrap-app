import {
  DeleteCommand,
  DeleteCommandInput,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { documentClient } from "./connection";
import { TABLE_NAME } from "../config";

export class ScrapGateway {
  async countByallScan() {
    const params: QueryCommandInput = {
      TableName: TABLE_NAME,
      IndexName: "CreatedAtIndex",
      ProjectionExpression: "id", // 取得する属性
      KeyConditionExpression: "scrap = :scrap",
      ExpressionAttributeValues: {
        ":scrap": "scrap",
      },
      ScanIndexForward: false,
    };

    const command = new QueryCommand(params);
    const response = await documentClient.send(command);
    const { $metadata, Count, Items, ScannedCount, LastEvaluatedKey } =
      response;
    console.log("SUCCESS (get scraps countByallScan):");
    console.log("Count:", Count);

    return Count;
  }

  async filterItemsByCount(count: number) {
    const params: QueryCommandInput = {
      TableName: TABLE_NAME,
      IndexName: "CreatedAtIndex",
      ProjectionExpression: "id",
      KeyConditionExpression: "scrap = :scrap",
      ExpressionAttributeValues: {
        ":scrap": "scrap",
      },
      ScanIndexForward: false,
      Limit: count,
    };

    const command = new QueryCommand(params);
    const response = await documentClient.send(command);
    const { $metadata, Count, Items, ScannedCount, LastEvaluatedKey } =
      response;
    console.log("SUCCESS (get filterItemsByCount):");
    console.log("Items:", Items);

    return Items;
  }

  async getTop10ItemsIdsByCreatedAtDescending() {
    const params: QueryCommandInput = {
      TableName: TABLE_NAME,
      IndexName: "CreatedAtIndex",
      ProjectionExpression: "id", // 取得する属性
      KeyConditionExpression: "scrap = :scrap", // 条件式
      ExpressionAttributeValues: {
        // 属性値置き換え
        ":scrap": "scrap",
      },
      ScanIndexForward: false, // 昇順にソート
      // Limit: 10, ページネーションができるまでの暫定処理
    };

    const command = new QueryCommand(params);
    const response = await documentClient.send(command);
    const { $metadata, Count, Items, ScannedCount, LastEvaluatedKey } =
      response;
    console.log("SUCCESS (get scraps):");
    console.log("Items:", Items);

    return Items;
  }

  async findForScrapId(scrapId: string) {
    const params: GetCommandInput = {
      TableName: TABLE_NAME,
      Key: {
        id: scrapId,
      },
    };

    const command = new GetCommand(params);
    const response = await documentClient.send(command);
    console.log("SUCCESS (get scrap):", response);

    return response.Item;
  }

  async create(title: string) {
    const uniqueId = uuidv4();
    const isOpen = true;

    const params: PutCommandInput = {
      TableName: TABLE_NAME,
      Item: {
        id: uniqueId,
        title,
        isOpen,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        scrap: "scrap",
        items: [],
      },
      ConditionExpression: "attribute_not_exists(id)",
    };
    const command = new PutCommand(params);
    const response = await documentClient.send(command);
    console.log("SUCCESS (put scrap):", response);

    return response;
  }

  async update(item: Record<string, any>) {
    const params: UpdateCommandInput = {
      TableName: TABLE_NAME,
      Key: { id: item.id },
      UpdateExpression: "SET #title = :newTitle, #isOpen = :newIsOpen",
      ExpressionAttributeNames: {
        "#title": "title",
        "#isOpen": "isOpen",
      },
      ExpressionAttributeValues: {
        ":newTitle": item.title,
        ":newIsOpen": item.isOpen,
      },
    };

    const command = new UpdateCommand(params);
    const response = await documentClient.send(command);
    console.log("SUCCESS (update scrap title):", response);

    return response;
  }

  async delete(id: string) {
    const params: DeleteCommandInput = {
      TableName: TABLE_NAME,
      Key: {
        id: id,
      },
    };

    const command = new DeleteCommand(params);
    const response = await documentClient.send(command);
    console.log("SUCCESS (delete scrap):", response);

    return response;
  }
}

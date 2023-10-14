import { UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { documentClient } from "./connection";
import { TABLE_NAME } from "../config";

export class ScrapItemGateway {
  async updateScrapItems(scrapId: string, newItems: any) {
    const params: UpdateCommandInput = {
      TableName: TABLE_NAME,
      Key: { id: scrapId },
      UpdateExpression: "SET #items = :newItems",
      ExpressionAttributeNames: {
        "#items": "items",
      },
      ExpressionAttributeValues: {
        ":newItems": newItems,
      },
    };

    const command = new UpdateCommand(params);
    const response = await documentClient.send(command);
    console.log("SUCCESS (update scrap item):", response);

    return response;
  }
}

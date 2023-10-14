import { GetCommand, GetCommandInput } from "@aws-sdk/lib-dynamodb";
import { documentClient } from "./connection";
import { TABLE_NAME } from "../config";

export class ScrapGateway {
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
}

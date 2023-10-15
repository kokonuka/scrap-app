import express from "express";
import {
  QueryCommand,
  GetCommand,
  PutCommand,
  QueryCommandInput,
  DeleteCommand,
  GetCommandInput,
  PutCommandInput,
  DeleteCommandInput,
  UpdateCommandInput,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { TABLE_NAME } from "../config";
import { documentClient } from "../infrastructure/connection";
import { ScrapGateway } from "../infrastructure/scrapGateway";

export const scrapRouter = express.Router();

const scrapGateway = new ScrapGateway();

scrapRouter.get("/", async (_req, res) => {
  const params: QueryCommandInput = {
    TableName: TABLE_NAME,
    IndexName: "CreatedAtIndex",
    KeyConditionExpression: "scrap = :scrap", // 条件式
    ExpressionAttributeValues: {
      // 属性値置き換え
      ":scrap": "scrap",
    },
    ScanIndexForward: true, // 昇順にソート
    Limit: 10,
  };

  try {
    const command = new QueryCommand(params);
    const response = await documentClient.send(command);
    console.log("SUCCESS (get scraps):", response);

    return res.status(200).json(response.Items);
  } catch (err: any) {
    console.log("ERROR:", err);

    return res.status(err.$metadata.httpStatusCode).json({
      message: err.message,
    });
  }
});

scrapRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const item = await scrapGateway.findForScrapId(id);

    return item
      ? res.status(200).json(item)
      : res.status(400).json({ message: "scrap not found" });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(400).json({ message: err });
  }
});

scrapRouter.post("/", async (req, res) => {
  const { title } = req.body;

  const uniqueId = uuidv4();

  const params: PutCommandInput = {
    TableName: TABLE_NAME,
    Item: {
      id: uniqueId,
      title: title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      scrap: "scrap",
      items: [],
    },
    ConditionExpression: "attribute_not_exists(id)",
  };

  try {
    const command = new PutCommand(params);
    const response = await documentClient.send(command);
    console.log("SUCCESS (put scrap):", response);

    return res.status(200).json(response);
  } catch (err) {
    console.log("ERROR:", err);

    return res.status(400).json({ message: err });
  }
});

scrapRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const params: UpdateCommandInput = {
    TableName: TABLE_NAME,
    Key: { id: id },
    UpdateExpression: "SET #title = :newTitle",
    ExpressionAttributeNames: {
      "#title": "title",
    },
    ExpressionAttributeValues: {
      ":newTitle": title,
    },
  };

  try {
    const command = new UpdateCommand(params);
    const response = await documentClient.send(command);
    console.log("SUCCESS (update scrap title):", response);

    return res.status(200).json(response);
  } catch (err) {
    console.log("ERROR:", err);

    return res.status(400).json({ message: err });
  }
});

scrapRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const params: DeleteCommandInput = {
    TableName: TABLE_NAME,
    Key: {
      id: id,
    },
  };

  try {
    const command = new DeleteCommand(params);
    const response = await documentClient.send(command);
    console.log("SUCCESS (delete scrap):", response);

    return res.status(200).json(response);
  } catch (err) {
    console.log("ERROR:", err);

    return res.status(400).json({ message: err });
  }
});

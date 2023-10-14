import express from "express";
import { v4 as uuidv4 } from "uuid";
import { ScrapGateway } from "../infrastructure/scrapGateway";
import { ScrapItemGateway } from "../infrastructure/scrapItemGateway";

export const scrapItemRouter = express.Router({ mergeParams: true });

const scrapGateway = new ScrapGateway();
const scrapItemGateway = new ScrapItemGateway();

type parentParam = { scrapId: string };

// アイテム一覧
scrapItemRouter.get("/", async (req, res) => {
  const { scrapId } = req.params as typeof req.params & parentParam;

  try {
    const item = await scrapGateway.findForScrapId(scrapId);

    return item
      ? res.status(200).json(item.items)
      : res.status(400).json({ message: "scrap not found" });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(400).json({ message: err });
  }
});

// アイテム作成
scrapItemRouter.post("/", async (req, res) => {
  const { scrapId } = req.params as typeof req.params & parentParam;
  const { content } = req.body;

  const uniqueId = uuidv4();

  try {
    const item = await scrapGateway.findForScrapId(scrapId);

    if (!item) {
      return res.status(400).json({ message: "scrap not found" });
    }

    // Todo: アイテムの最新orderを特定

    const newItem = {
      id: uniqueId,
      content,
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newItems = [...item.items, newItem];

    const response = await scrapItemGateway.updateScrapItems(scrapId, newItems);

    return res.status(200).json(response);
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(400).json({ message: err });
  }
});

// アイテム更新
scrapItemRouter.put("/:itemId", async (req, res) => {
  const { scrapId, itemId } = req.params as typeof req.params & parentParam;
  const { content } = req.body;

  try {
    const scrap = await scrapGateway.findForScrapId(scrapId);

    if (!scrap) {
      return res.status(400).json({ message: "scrap not found" });
    }

    // 該当のアイテムを探す（idの一致）
    const item = scrap.items.find((item: any) => item.id === itemId);

    if (!item) {
      return res.status(400).json({ message: "scrap item not found" });
    }

    const newItems = scrap.items.map((item: any) => {
      if (item.id === itemId) {
        item.content = content;
      }
      return item;
    });

    const response = await scrapItemGateway.updateScrapItems(scrapId, newItems);

    return res.status(200).json(response);
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(400).json({ message: err });
  }
});

// アイテム削除
scrapItemRouter.delete("/:itemId", async (req, res) => {
  const { scrapId, itemId } = req.params as typeof req.params & parentParam;

  try {
    const scrap = await scrapGateway.findForScrapId(scrapId);

    if (!scrap) {
      return res.status(400).json({ message: "scrap not found" });
    }

    // 該当のアイテムを探す（idの一致）
    const item = scrap.items.find((item: any) => item.id === itemId);

    if (!item) {
      return res.status(400).json({ message: "scrap item not found" });
    }

    const newItems = scrap.items.filter((item: any) => item.id !== itemId);

    const response = await scrapItemGateway.updateScrapItems(scrapId, newItems);

    return res.status(200).json(response);
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(400).json({ message: err });
  }
});

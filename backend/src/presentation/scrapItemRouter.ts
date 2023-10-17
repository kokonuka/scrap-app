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
    const scrap = await scrapGateway.findForScrapId(scrapId);

    if (!scrap) {
      return res.status(400).json({ message: "scrap not found" });
    }

    let order = 1;
    if (scrap.items.length > 0) {
      const lastItem = scrap.items[scrap.items.length - 1];
      order = lastItem.order + 1;
    }

    // Todo: scrapのupdatedAtを更新

    const newItem = {
      id: uniqueId,
      content,
      order,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newItems = [...scrap.items, newItem];

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

// アイテム並び替え
scrapItemRouter.put("/:itemId/move", async (req, res) => {
  const { scrapId, itemId } = req.params as typeof req.params & parentParam;
  const { moveDirection } = req.body;

  try {
    const scrap = await scrapGateway.findForScrapId(scrapId);
    if (!scrap) {
      return res.status(400).json({ message: "scrap not found" });
    }

    const item = scrap.items.find((item: any) => item.id === itemId);
    if (!item) {
      return res.status(400).json({ message: "scrap item not found" });
    }

    if (moveDirection === "up") {
      if (item.order === 1) {
        return res.status(400).json({ message: "scrap item not up" });
      }

      // Todo: anyを解消
      const rearrangeArray = (
        items: any[],
        condition: (item: any) => boolean
      ) => {
        for (let i = 1; i < items.length; i++) {
          const beforeItem: any = items[i - 1];
          const currentItem: any = items[i];
          if (condition(currentItem)) {
            // 特定の条件に一致する要素を見つけたら、前の要素と入れ替える
            beforeItem.order += 1;
            currentItem.order -= 1;
            items[i - 1] = currentItem;
            items[i] = beforeItem;
          }
        }
      };
      const condition = (item: any) => item.id === itemId;
      rearrangeArray(scrap.items, condition);

      const response = await scrapItemGateway.updateScrapItems(
        scrapId,
        scrap.items
      );

      return res.status(200).json(response);
    } else if (moveDirection === "down") {
      if (item.order === scrap.items.length) {
        return res.status(400).json({ message: "scrap item not down" });
      }

      const rearrangeArray = (
        items: any[],
        condition: (item: any) => boolean
      ) => {
        for (let i = items.length - 2; i >= 0; i--) {
          const afterItem: any = items[i + 1];
          const currentItem: any = items[i];
          if (condition(currentItem)) {
            afterItem.order -= 1;
            currentItem.order += 1;
            items[i + 1] = currentItem;
            items[i] = afterItem;
          }
        }
      };
      const condition = (item: any) => item.id === itemId;
      rearrangeArray(scrap.items, condition);

      const response = await scrapItemGateway.updateScrapItems(
        scrapId,
        scrap.items
      );

      return res.status(200).json(response);
    }
    return res.status(400).json({ message: "invalid request body" });
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

    const item = scrap.items.find((item: any) => item.id === itemId);

    if (!item) {
      return res.status(400).json({ message: "scrap item not found" });
    }

    const newItems = scrap.items.filter((item: any) => {
      if (item.id === itemId) {
        return false;
      } else if (
        item.order > scrap.items.find((i: any) => i.id === itemId).order
      ) {
        item.order -= 1;
      }
      return true;
    });

    const response = await scrapItemGateway.updateScrapItems(scrapId, newItems);

    return res.status(200).json(response);
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(400).json({ message: err });
  }
});

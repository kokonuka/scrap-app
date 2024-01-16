import express from "express";
import { ScrapGateway } from "../infrastructure/scrapGateway";
import { getLastNItems } from "../lib/getLastNItems";

export const scrapRouter = express.Router();

const scrapGateway = new ScrapGateway();

scrapRouter.get("/", async (req, res) => {
  const { count, page } = req.query;

  if (count) {
    // Todo: LastEvaluatedKeyがundefinedになるまでやる
    try {
      const Count = await scrapGateway.countByallScan();

      return res.status(200).json(Count);
    } catch (err: any) {
      console.log("ERROR:", err);

      return res.status(err.$metadata.httpStatusCode).json({
        message: err.message,
      });
    }
  }

  if (page) {
    const count = Number(page + "0");
    try {
      const Items = await scrapGateway.filterItemsByCount(count);
      if (!Items) return res.status(200).json(Items);

      const n = Items.length - (count - 10);
      const filteredItems = getLastNItems(Items, n);

      return res.status(200).json(filteredItems);
    } catch (err: any) {
      console.log("ERROR:", err);

      return res.status(err.$metadata.httpStatusCode).json({
        message: err.message,
      });
    }
  }

  try {
    const Items = await scrapGateway.getTop10ItemsIdsByCreatedAtDescending();
    return res.status(200).json(Items);
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

  try {
    const response = await scrapGateway.create(title);

    return res.status(200).json(response);
  } catch (err) {
    console.log("ERROR:", err);

    return res.status(400).json({ message: err });
  }
});

scrapRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const response = await scrapGateway.update(id, title);

    return res.status(200).json(response);
  } catch (err) {
    console.log("ERROR:", err);

    return res.status(400).json({ message: err });
  }
});

scrapRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const item = await scrapGateway.findForScrapId(id);
    if (!item) return res.status(400).json({ message: "scrap not found" });

    const response = await scrapGateway.delete(id);

    return res.status(200).json(response);
  } catch (err) {
    console.log("ERROR:", err);

    return res.status(400).json({ message: err });
  }
});

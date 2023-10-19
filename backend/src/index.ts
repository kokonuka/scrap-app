import express from "express";
import type { Express, Request, Response } from "express";
import serverlessExpress from "@vendia/serverless-express";
import cors from "cors";
import { scrapRouter } from "./presentation/scrapRouter";
import { scrapItemRouter } from "./presentation/scrapItemRouter";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const PORT = process.env.PORT || 3001;

const app: Express = express();
app.use(cors());
app.use(express.json());

app.get("/ogp", async (req, res) => {
  const { url } = req.query;

  await fetch(url as string)
    // URLからtext/htmlデータを取得 ====================================
    .then((res) => res.text())
    .then((text) => {
      const metaData = {
        url: url as string,
        title: "",
        description: "",
        image: "",
      };
      // 取得したtext/htmlデータから該当するmetaタグを取得 ==============
      const doms = new JSDOM(text);
      const metas = doms.window.document.getElementsByTagName("meta");

      // title, description, imageにあたる情報を取り出し配列として格納 ==
      for (let i = 0; i < metas.length; i++) {
        console.log(" i: ", i);
        console.log(" metas[i]", metas[i]);
        console.log("name", metas[i].getAttribute("name"));
        console.log("property", metas[i].getAttribute("property"));

        let pro = metas[i].getAttribute("name");
        if (typeof pro == "string") {
          if (pro.match("title") && metaData.title === "")
            metaData.title = metas[i].getAttribute("content");
          if (pro.match("description") && metaData.description === "")
            metaData.description = metas[i].getAttribute("content");
          if (pro.match("image") && metaData.image === "")
            metaData.image = metas[i].getAttribute("content");
        }

        pro = metas[i].getAttribute("property");
        if (typeof pro == "string") {
          if (pro.match("title") && metaData.title === "")
            metaData.title = metas[i].getAttribute("content");
          if (pro.match("description") && metaData.description === "")
            metaData.description = metas[i].getAttribute("content");
          if (pro.match("image") && metaData.image === "")
            metaData.image = metas[i].getAttribute("content");
        }
      }
      console.log(metaData);
      return res.status(200).json(metaData);
    })
    .catch((e) => {
      console.log(e);
      return res.status(400).json({ message: e });
    });
});

app.use("/scraps", scrapRouter);
scrapRouter.use("/:scrapId/items", scrapItemRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

// export const handler = serverlessExpress({ app });

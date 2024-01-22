import express from "express";
import type { Express, Request, Response } from "express";
import serverlessExpress from "@vendia/serverless-express";
import cors from "cors";
import { scrapRouter } from "./presentation/scrapRouter";
import { scrapItemRouter } from "./presentation/scrapItemRouter";

const PORT = 3001;

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use("/scraps", scrapRouter);
scrapRouter.use("/:scrapId/items", scrapItemRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

export const handler = serverlessExpress({ app });

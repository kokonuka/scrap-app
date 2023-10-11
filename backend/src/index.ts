import express from "express";
import type { Express, Request, Response } from "express";
import serverlessExpress from "@vendia/serverless-express";

const app: Express = express();
// app.use(cors());
app.use(express.json());
const port = 3001;

app.get("/hoge", async (req: Request, res: Response) => {
  return res.status(200).json({
    id: "id",
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

export const handler = serverlessExpress({ app });

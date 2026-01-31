import "dotenv/config";

import express from "express";
import cors from "cors";

import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use(routes);

export default app;

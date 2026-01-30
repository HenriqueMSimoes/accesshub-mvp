import "dotenv/config";

import express from "express";
import cors from "cors";

import clientsRoutes from "./routes/clients.routes";
import serversRoutes from "./routes/servers.routes";
import portsRoutes from "./routes/ports.routes";
import softwaresRoutes from "./routes/softwares.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/clients", clientsRoutes);
app.use("/servers", serversRoutes);
app.use("/ports", portsRoutes);
app.use("/softwares", softwaresRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

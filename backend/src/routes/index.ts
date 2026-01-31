import { Router } from "express";

import clientsRoutes from "./clients.routes.js";
import serversRoutes from "./servers.routes.js";
import portsRoutes from "./ports.routes.js";
import softwaresRoutes from "./softwares.routes.js";

const routes = Router();

routes.use("/clients", clientsRoutes);
routes.use("/servers", serversRoutes);
routes.use("/ports", portsRoutes);
routes.use("/softwares", softwaresRoutes);

export default routes;

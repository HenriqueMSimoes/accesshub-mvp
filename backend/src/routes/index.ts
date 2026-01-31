import { Router } from "express";

import clientsRoutes from "./clients.routes";
import serversRoutes from "./servers.routes";
import portsRoutes from "./ports.routes";
import softwaresRoutes from "./softwares.routes";

const routes = Router();

routes.use("/clients", clientsRoutes);
routes.use("/servers", serversRoutes);
routes.use("/ports", portsRoutes);
routes.use("/softwares", softwaresRoutes);

export default routes;

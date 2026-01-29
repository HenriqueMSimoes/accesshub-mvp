import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  createServer,
  listServers,
} from "../controllers/servers.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", createServer);
router.get("/", listServers);

export default router;

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  createServer,
  listServersByClient,
  updateServer,
  deleteServer,
} from "../controllers/servers.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", createServer);
router.get("/", listServersByClient);
router.put("/:id", updateServer);
router.delete("/:id", deleteServer);

export default router;

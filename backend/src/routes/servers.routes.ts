import { Router } from "express";
import {
  createServer,
  listServersByClient,
  updateServer,
  deleteServer,
} from "../controllers/servers.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, createServer);
router.get("/:client_id", authMiddleware, listServersByClient);
router.put("/:id", authMiddleware, updateServer);
router.delete("/:id", authMiddleware, deleteServer);

export default router;

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  createPort,
  listPortsbyServer,
  updatePort,
  deletePort,
} from "../controllers/ports.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", createPort);
router.get("/:server_id", listPortsbyServer);
router.put("/:id", updatePort);
router.delete("/:id", deletePort);

export default router;

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  createPort,
  listPortsByServer,
  updatePort,
  deletePort,
} from "../controllers/ports.controller.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createPort);
router.get("/:server_id", listPortsByServer);
router.put("/:id", updatePort);
router.delete("/:id", deletePort);

export default router;

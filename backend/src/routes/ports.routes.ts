import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  createPort,
  listPortsbyServer,
} from "../controllers/ports.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", createPort);
router.get("/", listPortsbyServer);

export default router;

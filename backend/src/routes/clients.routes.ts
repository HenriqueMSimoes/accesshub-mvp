import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  createClient,
  listClients,
} from "../controllers/clients.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", createClient);
router.get("/", listClients);

export default router;

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  createClient,
  listClients,
  updateClient,
  deleteClient,
} from "../controllers/clients.controller.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createClient);
router.get("/", listClients);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;

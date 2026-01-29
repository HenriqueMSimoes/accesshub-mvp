import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  createSoftware,
  listSoftwares,
} from "../controllers/softwares.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", createSoftware);
router.get("/", listSoftwares);

export default router;

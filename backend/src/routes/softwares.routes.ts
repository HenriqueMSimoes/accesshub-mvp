import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  createSoftware,
  listSoftwares,
  updateSoftware,
  deleteSoftware,
  listSoftwaresByServer,
} from "../controllers/softwares.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", createSoftware);
router.get("/", listSoftwares);
router.get("/server/:server_id", listSoftwaresByServer);
router.put("/:id", updateSoftware);
router.delete("/:id", deleteSoftware);

export default router;

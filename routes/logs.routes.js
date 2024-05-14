import { Router } from "express";
import { getLogs, postLogs } from "../controllers/logs.controller.js";

const router = Router()

router.route("/").post(postLogs);
router.route("/api/logs").get(getLogs);

export default router;
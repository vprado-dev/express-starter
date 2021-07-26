import { Router } from "express";
import { statusGet } from "../endpoint/status";
import { auth } from "../middlewares/auth";

const router = Router();

/**
 * GET /status
 * @tag status
 * @security BearerAuth
 * @response 204
 * @responseContent {status} 204.application/json
 * @responseContent {Error} default.application/json
 */

router.get("/status", auth, statusGet);

export default router;

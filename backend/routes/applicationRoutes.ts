import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { validateParams } from "../middleware/ValidateParams";
import {
  getApplications,
  createApplication,
  getAppById,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController";

// /api/apps
const router = Router();

// middleware
router.use("/:appId", validateParams("appId"));
router.use(protect);

router.route("/").get(getApplications).post(createApplication);

router.route("/:appId").get(getAppById).put(updateApplication).delete(deleteApplication);

export default router;

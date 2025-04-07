import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { getApplications, createApplication } from "../controllers/applicationController";

// api/apps
const router = Router();

router.route("/").get(protect, getApplications).post(protect, createApplication);

router
  .route("/:appId")
  .get(protect, () => {})
  .post(protect, () => {})
  .put(protect, () => {})
  .delete(protect, () => {});

export default router;

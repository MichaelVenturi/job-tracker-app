import { Router } from "express";
import { protect } from "../middleware/authMiddleware";

// api/apps
const router = Router();

router
  .route("/")
  .get(protect, () => {})
  .post(protect, () => {});

router
  .route("/:appId")
  .get(protect, () => {})
  .post(protect, () => {})
  .put(protect, () => {})
  .delete(protect, () => {});

export default router;

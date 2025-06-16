import express from "express";
import {
  createReview,
  getProductReviews,
} from "../controllers/ReviewController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:id/reviews", protect, createReview);
router.get("/:id/reviews", getProductReviews);

export default router;
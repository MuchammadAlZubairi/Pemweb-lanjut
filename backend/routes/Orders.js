import express from "express";
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
} from "../controllers/OrderController.js";
import { protect, admin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.get("/", protect, admin, getAllOrders);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

export default router;
import express from "express";
import { createOrder, getMyOrders, getAllOrders } from "../controllers/order";
import { admin, protect } from "../middlewares/auth";

const router = express.Router();

router.post("/", protect, createOrder); // place order
router.get("/my-orders", protect, getMyOrders); // customer’s orders

router.get("/", protect, admin, getAllOrders); // admin: all orders

export default router;

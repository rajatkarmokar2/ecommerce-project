import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart";
import { protect } from "../middlewares/auth";

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/:productId", protect, removeFromCart);

export default router;

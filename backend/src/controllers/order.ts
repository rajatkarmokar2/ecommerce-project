import Order from "../models/order";
import Cart from "../models/cart";
import { IUserRequest } from "../types/user";
import { ICart } from "../types/cart";
import { IProduct } from "../types/product";
import { Document } from "mongoose";
import { Response } from "express";

export const createOrder = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const cart = (await Cart.findOne({ user: req?.user?._id })) as (Document & ICart) | null;

    if (!cart || cart.items.length === 0) {
      res.status(400).json({ message: "Cart is empty" });
      return;
    }

    const cartWithProducts = await cart.populate("items.product");

    const totalAmount = cartWithProducts.items.reduce(
      (sum, item) => sum + (item.product as IProduct)?.price * item.quantity,
      0,
    );

    const order = await Order.create({
      user: req?.user?._id,
      items: cart.items,
      totalAmount,
      paymentMethod: req.body?.paymentMethod,
    });

    // clear cart
    await cart.updateOne({ items: [] });

    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: error || "Internal server error" });
  }
};

export const getMyOrders = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ user: req?.user?._id }).populate("items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error || "Internal server error" });
  }
};

export const getAllOrders = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const orders = await Order.find().populate("user").populate("items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error || "Internal server error" });
  }
};

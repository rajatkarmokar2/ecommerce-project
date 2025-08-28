import { Response } from "express";
import Cart from "../models/cart";
import Product from "../models/product";
import { IUserRequest } from "../types/user";

export const addToCart = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    let cart = await Cart.findOne({ user: req?.user?._id });

    if (!cart) {
      cart = new Cart({ user: req?.user?._id, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getCart = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const cart = await Cart.findOne({ user: req?.user?._id }).populate("items.product");
    if (!cart) {
      res.json({ items: [] });
      return;
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const removeFromCart = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req?.user?._id });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    const updatedCart = await cart.updateOne({
      cart: {
        item: cart.items.filter((item) => item.product.toString() !== productId),
      },
    });

    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

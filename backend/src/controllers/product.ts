import { Request, Response } from "express";
import Product from "../models/product";
import { IUserRequest } from "../types/user";

interface ErrorType {
  message: string;
}

export const createProduct = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const { user } = req;
    const product = new Product({
      ...req.body,
      createdBy: user?._id,
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (e) {
    const error = e as ErrorType;
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (e) {
    const error = e as ErrorType;
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (e) {
    const error = e as ErrorType;
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(updatedProduct);
  } catch (e) {
    const error = e as ErrorType;
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ message: "Product deleted" });
  } catch (e) {
    const error = e as ErrorType;
    res.status(500).json({ message: error.message });
  }
};

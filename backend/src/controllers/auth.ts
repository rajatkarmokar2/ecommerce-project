import User from "../models/user";
import { Request, Response } from "express";
import { generateToken } from "../utils/generateToken";
import { IUserModel, IUserRequest } from "../types/user";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    // const message = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ message: error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: IUserModel | null = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "User not registered" });
      return;
    }

    const isValidUser = await user.matchPassword(password);

    if (!isValidUser) {
      res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    // const message = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ message: error });
  }
};

export const getUserProfile = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req?.user?._id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    // const message = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ message: error });
  }
};

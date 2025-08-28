import { Request } from "express";
import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
}

export interface IUserModel extends IUser {
  matchPassword: (_password: string) => Promise<boolean>;
}

export interface IUserRequest extends Request {
  user?: IUser;
}

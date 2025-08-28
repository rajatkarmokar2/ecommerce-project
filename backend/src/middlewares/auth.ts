import jwt from "jsonwebtoken";
import User from "../models/user";
import { NextFunction, Request, Response } from "express";
import { IUserModel, IUserRequest } from "../types/user";

export const protect = async (req: IUserRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUserModel;
      const user = await User.findById(decoded._id).select("-password");
      if (user) req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed", error });
    }
  }

  if (!token) return res.status(401).json({ message: "Not authorized, no token" });
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as IUserRequest;
  if (user && user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin", user });
  }
};

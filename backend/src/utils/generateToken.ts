import jwt from "jsonwebtoken";

export const generateToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
};

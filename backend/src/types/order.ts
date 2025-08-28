import { ObjectId } from "mongoose";
import { IUser } from "./user";
import { IProduct } from "./product";

export interface IOrder {
  user: ObjectId | IUser;
  items: [
    {
      product: ObjectId | IProduct;
      quantity: number;
    },
  ];
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "COD" | "Stripe" | "Razorpay";
}

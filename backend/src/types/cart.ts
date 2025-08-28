import { ObjectId } from "mongoose";
import { IProduct } from "./product";
import { IUser } from "./user";

export interface ICart {
  user: ObjectId | IUser;
  items: {
    product: ObjectId | IProduct;
    quantity: number;
  }[];
}

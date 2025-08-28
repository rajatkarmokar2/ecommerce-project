import { ObjectId } from "mongoose";

export interface IProduct {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

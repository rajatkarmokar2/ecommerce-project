import dotenv from "dotenv";
const envFile = process.env.NODE_ENV === "prod" ? ".env.prod" : ".env.dev";
dotenv.config({ path: envFile });
import express from "express";
import cors from "cors";

import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import cartRoutes from "./routes/cart";
import orderRoutes from "./routes/order";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req,res)=> res.send('server running'));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

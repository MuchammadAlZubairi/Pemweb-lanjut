import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";
import authRoutes from "./routes/Auth.js";
import userRoutes from "./routes/User.js";
import categoryRoutes from "./routes/Category.js";
import productRoutes from "./routes/Product.js";
import orderRoutes from "./routes/Orders.js";
import reviewRoutes from "./routes/Review.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
try {
  await db.authenticate();
  console.log("Database connected");
} catch (error) {
  console.error("Database connection error:", error);
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", reviewRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
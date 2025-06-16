import db from "../config/database.js";
import User from "./User.js";
import Category from "./Category.js";
import Product from "./Product.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Review from "./Review.js";

// Define relationships
Category.hasMany(Product);
Product.belongsTo(Category);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

// Sync models with database
(async () => {
  try {
    await db.sync({ force: false });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Database sync error:", error);
  }
})();

export { User, Category, Product, Order, OrderItem, Review };
import { DataTypes } from "sequelize";
import db from "../config/database.js";

const OrderItem = db.define("order_items", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

export default OrderItem;
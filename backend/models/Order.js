import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Order = db.define("orders", {
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  paidAt: {
    type: DataTypes.DATE,
  },
  isDelivered: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  deliveredAt: {
    type: DataTypes.DATE,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shippingAddress: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  paymentResult: {
    type: DataTypes.TEXT,
  },
});

export default Order;
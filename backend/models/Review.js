import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Review = db.define("reviews", {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT,
  },
});

export default Review;
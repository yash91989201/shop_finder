import mongoose, { Schema } from "mongoose";

const ShopSchema = new Schema({
  name: String,
  area: {
    type: String,
    required: [true, "Shop must have an area."],
  },
  category: {
    type: String,
    required: [true, "Shop must have a category."],
  },
  opening_date: {
    type: Date,
    required: [true, "Provide day of a week."],
  },
  closing_date: {
    type: Date,
    required: [true, "Provide day of a week."],
  },
});

export default mongoose.models.Shop || mongoose.model("Shop", ShopSchema);

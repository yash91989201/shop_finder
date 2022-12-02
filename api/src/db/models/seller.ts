import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import config
import { SECRET_KEY } from "../../config";

const SellerSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// converting password into hash
SellerSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, SECRET_KEY);
    this.tokens.push({ token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

SellerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export default mongoose.models.Seller || mongoose.model("Seller", SellerSchema);

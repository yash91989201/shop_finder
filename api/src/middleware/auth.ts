import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Seller from "../db/models/seller";
// import config
import { SECRET_KEY } from "../config";

interface JwtPayload {
  _id?: string;
}
export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.auth_token;
    const verify_user = jwt.verify(token, SECRET_KEY) as JwtPayload;
    if (verify_user._id != undefined) {
      const seller_data = await Seller.findOne({
        _id: verify_user._id,
      });
      res.isAuthenticated = true;
      res.seller = {
        id: seller_data._id,
        email: seller_data.email,
        username: seller_data.username,
      };
      next();
    }
  } catch (error) {
    res.isAuthenticated = false;
    res.status(401).json({
      status: false,
      message: "You are not authenticated",
      data: null,
    });
  }
}

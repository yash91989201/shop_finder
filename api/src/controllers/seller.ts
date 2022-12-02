import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Seller from "../db/models/seller";

export async function signup(req: Request, res: Response) {
  const { email, username, password } = req.body;
  try {
    const new_seller = new Seller({
      email,
      username,
      password,
    });
    const token = await new_seller.generateAuthToken();
    res.cookie("auth_token", token, {
      expires: new Date(Date.now() + 50000),
      httpOnly: true,
    });
    await new_seller.save();
    res.status(201).json({
      success: true,
      message: "Signup successful",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Problem with signup",
      data: null,
    });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const seller = await Seller.findOne({ email });
    if (seller == null) throw new Error("User does not exists!");
    const password_match = await bcrypt.compare(password, seller.password);
    if (password_match) {
      const token = await seller.generateAuthToken();
      res.cookie("auth_token", token, {
        expires: new Date(Date.now() + 9999999),
        httpOnly: true,
      });
      return res.status(201).json({
        success: true,
        message: "Login successful",
        data: null,
      });
    }
    throw new Error();
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: `Problem with login: ${error.message}`,
        data: null,
      });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    res.cookie("auth_token", "");
    res.end();
  } catch (error) {
    console.log(error);
  }
}

export async function checkAuth(req: Request, res: Response) {
  try {
    if (res.isAuthenticated) {
      return res.status(200).json({
        isAuthenticated: res.isAuthenticated,
        user: res.seller,
      });
    } else {
      throw new Error("Not authorized");
    }
  } catch (error) {
    if (error instanceof Error)
      res.status(401).json({
        isAuthenticated: false,
        error: error.message,
      });
  }
}

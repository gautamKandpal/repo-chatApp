import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (userId: String, res: Response) => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: "5d",
  });
  res.cookie("accessToken", token, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};

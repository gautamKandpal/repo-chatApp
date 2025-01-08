import { Request, Response } from "express";
import prisma from "../db/primsaClient.js";
import bcryptjs from "bcryptjs";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, fullname, password, confirmPassword, gender } = req.body;

    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "please fill all the fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }
    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcryptjs.hashSync(password, 10);
  } catch (error) {}
};

export const login = (req: Request, res: Response) => {
  res.send("hello from login route");
};

export const logout = (req: Request, res: Response) => {
  res.send("hello from logout route");
};

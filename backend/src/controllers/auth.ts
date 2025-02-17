import { Request, Response } from "express";
import prisma from "../db/primsaClient.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, fullName, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }
    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      },
    });
    if (newUser) {
      // Token generation
      generateToken(newUser.id, res);

      res.status(200).json({
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err: any) {
    console.log("Error in signUp", err.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(401).json({
        err: "Please provide all the fields",
      });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials!" });
    }

    //Token generation
    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (err: any) {
    console.log("Error in login", err.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err: any) {
    console.log("Error in logout", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      userName: user.username,
      profilePic: user.profilePic,
    });
  } catch (err: any) {
    console.log("Error in getMe", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

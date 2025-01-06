import { Request, Response } from "express";

export const signup = (req: Request, res: Response) => {
  res.send("hello from signup route");
};

export const login = (req: Request, res: Response) => {
  res.send("hello from login route");
};

export const logout = (req: Request, res: Response) => {
  res.send("hello from logout route");
};

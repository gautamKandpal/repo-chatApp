import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.js";

const router = Router();

router.get("/sign-up", signup);
router.get("/login", login);
router.get("/logout", logout);

export default router;

import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.js";

const router = Router();

router.post("/sign-up", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;

import { Router } from "express";
import { getMe, signup, login, logout } from "../controllers/auth.js";
import protectRoute from "../middleware/protectRoute.js";
const router = Router();
router.get("/me", protectRoute, getMe);
router.post("/sign-up", signup);
router.post("/login", login);
router.post("/logout", logout);
export default router;

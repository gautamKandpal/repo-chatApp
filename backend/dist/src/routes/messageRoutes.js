import Router from "express";
import { sendMessage, getMessages, getUsersForSidebar, } from "../controllers/message.js";
import protectRoute from "../middleware/protectRoute.js";
const router = Router();
router.get("/conversations", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
export default router;

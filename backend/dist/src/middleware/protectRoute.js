import jwt from "jsonwebtoken";
import prisma from "../db/primsaClient.js";
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res
                .status(401)
                .json({ error: "Unauthorized - No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
            select: { id: true, username: true, fullName: true, profilePic: true },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = user;
        next(); //proceed with getMe controller
    }
    catch (err) {
        console.log("Error from protect route", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export default protectRoute;

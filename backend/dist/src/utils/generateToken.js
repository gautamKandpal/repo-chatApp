import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ userId }, secretKey, {
        expiresIn: "5d",
    });
    res.cookie("accessToken", token, {
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true, //prevent XSS -> Cross siete scripting
        sameSite: "strict", //prevent CSRF attack -> cross-site request forgery
        secure: process.env.NODE_ENV !== "development",
    });
    return token;
};

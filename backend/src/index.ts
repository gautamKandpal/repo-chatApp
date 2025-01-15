import express from "express";
import cookieParser from "cookie-parser";
import auth from "./routes/authRoutes.js";
import message from "./routes/messageRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/messages", message);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DBConnect from "./configs/DBConnect.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://auth-system-basic-32cy.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
const PORT = process.env.PORT || 5000;

DBConnect();

app.get("/test", (req, res) => {
  res.status(200).json("Server is working perfectly");
});

app.use("/user/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`app is listening on http://localhost:${PORT}`);
});

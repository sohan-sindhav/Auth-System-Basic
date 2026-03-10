import {
  registerController,
  loginUser,
  userProfile,
  logout,
} from "../controllers/Auth.Controller.js";
import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/AuthProtection.js";

router.post("/signup", registerController);
router.post("/login", loginUser);
router.get("/profile", verifyToken, userProfile);
router.post("/logout", verifyToken, logout);

export default router;

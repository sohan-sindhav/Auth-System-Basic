import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.models.js";

export const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isExist = await User.findOne({ username });
    if (!isExist) {
      const hashedpassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedpassword });
      await user.save();
      return res
        .status(201)
        .json({ success: true, msg: "User created. Login now." });
    } else {
      return res
        .status(409)
        .json({ success: false, msg: "user already exist. Login instead" });
    }
  } catch (error) {
    console.log("Error creating user : ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error. try after server gets fixed.",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (passwordCheck) {
        const token = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "7d" },
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
          success: true,
          username: user.username,
          msg: "user login successful",
        });
      } else {
        return res
          .status(401)
          .json({ success: false, msg: "Invalid Password" });
      }
    } else {
      return res.status(401).json({ success: false, msg: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ success: false, msg: "Internal server error" });
  }
};

export const userProfile = async (req, res) => {
  const userId = req.user;
  const user = await User.findById(userId.id);

  const username = user.username;

  return res
    .status(201)
    .json({ userlogin: true, msg: `user is ${username}`, username });
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

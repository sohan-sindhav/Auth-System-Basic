import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DBConnect = async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Connected to Database");
    });
  } catch (error) {
    console.log("Error connecting database : ", error);
  }
};

export default DBConnect;

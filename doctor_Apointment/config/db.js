import mongoose from "mongoose";
import 'colors';

const connectdb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected".bgGreen.white);
    });

    await mongoose.connect(process.env.MONGO_URL);  // ✅ FIXED
  } catch (error) {
    console.log(error);
  }
};

export default connectdb;
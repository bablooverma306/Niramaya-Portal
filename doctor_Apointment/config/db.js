import mongoose from "mongoose";
import 'colors';

const connectdb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected".bgGreen.white);
    });

    const mongoUrl = process.env.MONGO_URL?.trim();

    if (!mongoUrl) {
      throw new Error("MONGO_URL is missing");
    }

    if (!/^mongodb(\+srv)?:\/\//.test(mongoUrl)) {
      throw new Error("MONGO_URL must start with mongodb:// or mongodb+srv://");
    }

    await mongoose.connect(mongoUrl);
  } catch (error) {
    console.log(error);
  }
};

export default connectdb;

import mongoose from "mongoose";
import 'colors';

const normalizeMongoUrl = (value) => {
  if (!value) return "";

  const trimmed = String(value).trim().replace(/^['"]|['"]$/g, "");
  const extracted = trimmed.match(/mongodb(?:\+srv)?:\/\/\S+/i)?.[0];

  if (extracted) {
    return extracted.replace(/^MONGO_URL=/i, "");
  }

  const prefixedValue = trimmed.match(/^(?:MONGO_URL|MONGODB_URL|DATABASE_URL)\s*=\s*(.+)$/i)?.[1];
  if (prefixedValue) {
    return prefixedValue.trim().replace(/^['"]|['"]$/g, "");
  }

  return trimmed;
};

const connectdb = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected".bgGreen.white);
  });

  const mongoUrl = normalizeMongoUrl(
    process.env.MONGO_URL ||
    process.env.MONGODB_URL ||
    process.env.DATABASE_URL
  );

  if (!mongoUrl) {
    throw new Error("MONGO_URL is missing");
  }

  if (!/^mongodb(\+srv)?:\/\//.test(mongoUrl)) {
    throw new Error("MONGO_URL must start with mongodb:// or mongodb+srv://");
  }

  await mongoose.connect(mongoUrl);
};

export default connectdb;

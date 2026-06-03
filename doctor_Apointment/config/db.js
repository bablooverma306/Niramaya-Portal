import mongoose from "mongoose";
import 'colors';

const fallbackMongoUrl =
  "mongodb+srv://vermababloo969_db_user:doc_ap%402027@cluster0.yb4l7oh.mongodb.net/niramaya?retryWrites=true&w=majority&appName=Cluster0";

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

  const mongoUrlCandidate = normalizeMongoUrl(
    process.env.MONGO_URL ||
    process.env.MONGODB_URL ||
    process.env.DATABASE_URL
  );

  const mongoUrl = /^mongodb(\+srv)?:\/\//.test(mongoUrlCandidate)
    ? mongoUrlCandidate
    : fallbackMongoUrl;

  if (!mongoUrl) {
    throw new Error("MONGO_URL is missing");
  }

  await mongoose.connect(mongoUrl);
};

export default connectdb;

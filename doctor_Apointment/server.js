import express from "express";
import morgan from "morgan";
import "colors";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import connectdb from "./config/db.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import testRoute from "./routes/testRout.js";
import userRouter from "./routes/userRouter.js";
import doctorRout from "./routes/doctorRout.js";
import webMessageRout from "./routes/webMessageRout.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, "client", "dist");
const adminDistPath = path.join(__dirname, "..", "admin-panel", "dist");
const clientIndexPath = path.join(clientDistPath, "index.html");
const adminIndexPath = path.join(adminDistPath, "index.html");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

app.use("/api/v1", testRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/doctor", doctorRout);
app.use("/api/v1/webmessage", webMessageRout);
app.use("/api/v1/appointment", appointmentRoutes);

app.get("/api/v1/health", (req, res) => {
  res.send("Server is running");
});

const shouldServeClient = fs.existsSync(clientIndexPath);
const shouldServeAdmin = fs.existsSync(adminIndexPath);

if (shouldServeAdmin) {
  app.use("/admin", express.static(adminDistPath));
  app.get(/^\/admin(\/.*)?$/, (req, res) => {
    res.sendFile(adminIndexPath);
  });
}

if (shouldServeClient) {
  app.use(express.static(clientDistPath));

  app.get(/^(?!\/api\/v1|\/admin).*/, (req, res) => {
    res.sendFile(clientIndexPath);
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is running");
  });
}

const startServer = async () => {
  try {
    await connectdb();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`.bgCyan.white);
    });
  } catch (error) {
    console.error("Server startup failed:".bgRed.white, error.message);
    process.exit(1);
  }
};

startServer();

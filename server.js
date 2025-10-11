import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import express from "express";
import authRouter from "./routers/auth.js";
import mongoose from "mongoose";
import cors from "cors";
import propertyRouter from "./routers/properties.js";
const app = express();

app.use(express.json());
const allowedOrigins = [
  process.env.LOCAL_FRONT_ENDPOINT,
  process.env.FRONT_END_ENDPOINT,
  "localhost:8000",
];
const pinger = express.Router();
pinger.get("/ping", (req, res) => {
  return res.json({ success: true });
});
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "ngrok-skip-browser-warning",
      "Access-Control-Allow-Origin",
    ],
  })
);
app.use("/api/auth", authRouter);
app.use("/api/properties", propertyRouter);

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error.name));
db.once("open", () => console.log("connected to mongoose"));
app.listen(process.env.PORT || 5000);

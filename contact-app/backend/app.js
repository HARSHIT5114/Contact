import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";
import dotenv from "dotenv"; 

const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.use("/api/contacts", contactRoutes);

export default app;

import express from "express";
import path from "path";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/db";
import { errorHandler } from "./middleware/errorMiddleware";
import userRoutes from "./routes/userRoutes";
import applicationRoutes from "./routes/applicationRoutes";

config();
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/apps", applicationRoutes);

// serve frontend
if (process.env.NODE_ENV === "production") {
  // set build folder as static
  app.use(express.static(path.join(import.meta.dirname, "../client/dist")));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(import.meta.dirname, "../client/dist/index.html"));
  });
} else {
  app.get("/", (_req, res) => {
    res.status(201).json({ message: "Welcome to the Job Track app" });
  });
}
app.use(errorHandler);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

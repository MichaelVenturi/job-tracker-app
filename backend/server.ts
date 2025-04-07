import express from "express";
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

app.use(errorHandler);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/db";

config();
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

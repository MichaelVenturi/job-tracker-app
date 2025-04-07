import * as express from "express-serve-static-core";
import { UserType } from "./backend/models/userModel.ts";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      MONGO_URI: string;
      JWT_SECRET: string;
    }
  }
}

export {};

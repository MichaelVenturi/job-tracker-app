import { Request } from "express";
import { UserType } from "../models/userModel";

// requests ----------------------------
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateAppRequest extends Request {
  body: {
    jobTitle: string;
    companyName: string;
    link: string;
    location: string;
    notes?: string;
  };
}

// responses ---------------------------
export interface ResponseAuthLocals {
  user?: UserType;
}
export interface CreateUserResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

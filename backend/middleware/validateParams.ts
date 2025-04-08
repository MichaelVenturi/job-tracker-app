import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export const validateParams = (param: string) => (req: Request, res: Response, next: NextFunction) => {
  if (!Types.ObjectId.isValid(req.params[param])) {
    res.status(400);
    throw new Error("Invalid ID format");
  }
  next();
};

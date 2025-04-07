import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  let message = "unknown error";
  let stack = "";
  if (err instanceof Error) {
    message = err.message;
    stack = err.stack ?? "";
  }
  res.json({ message, stack: process.env.NODE_ENV === "production" ? null : stack });
};

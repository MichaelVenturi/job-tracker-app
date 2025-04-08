import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

import { Request, Response, RequestHandler, NextFunction } from "express";
import { ResponseAuthLocals } from "../types/apiTypes";

export const protect: RequestHandler = asyncHandler(
  async (req: Request, res: Response<{}, ResponseAuthLocals>, next: NextFunction) => {
    let token: string | undefined;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
        token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findById((<{ id: string }>decoded).id);
        if (!user) {
          res.status(401);
          throw new Error("User not found");
        }

        res.locals.user = user.toJSON();
        next();
      } catch (err) {
        console.log(err);
        res.status(401);
        throw new Error("Not authorized");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }
);

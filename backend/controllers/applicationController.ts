import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import Application, { ApplicationType } from "../models/applicationModel";
import { Request, Response } from "express";
import { ResponseAuthLocals, CreateAppRequest } from "../types/apiTypes";

export const getApplications = asyncHandler(async (_req, res: Response<{}, ResponseAuthLocals>) => {
  if (!res.locals.user) {
    res.status(401);
    throw new Error("Missing auth");
  }
  const user = await User.findById(res.locals.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const apps = await Application.find({ user: res.locals.user._id }).select("-__v");
  res.status(200).json(apps);
});

export const createApplication = asyncHandler(async (req: CreateAppRequest, res: Response<{}, ResponseAuthLocals>) => {
  const { jobTitle, companyName, location, link, notes } = req.body;
  if (!jobTitle || !companyName || !location || !link) {
    res.status(400);
    throw new Error("Please enter all required fields");
  }
  if (!res.locals.user) {
    res.status(401);
    throw new Error("Missing auth");
  }
  const user = await User.findById(res.locals.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const application = await Application.create({
    user: res.locals.user._id,
    jobTitle,
    companyName,
    location,
    link,
    notes,
  });
  res.status(201).json(application.toJSON());
});

export const getAppById = asyncHandler(
  async (req: Request<{ appId: string }>, res: Response<{}, ResponseAuthLocals>) => {
    // validate auth was passed
    if (!res.locals.user) {
      res.status(401);
      throw new Error("Missing auth");
    }
    // validate user exists
    const user = await User.findById(res.locals.user._id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    const id = req.params.appId;
    // TODO: validate ID param

    const application = await Application.findById(id).select("-__v");
    // validate app exists
    if (!application) {
      res.status(404);
      throw new Error("application not found");
    }
    // validate if app belongs to this user
    if (application.user.toString() !== res.locals.user._id.toString()) {
      res.status(401);
      throw new Error("not authorized");
    }

    res.status(200).json(application);
  }
);

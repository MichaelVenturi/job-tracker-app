import asyncHandler from "express-async-handler";
import Application, { ApplicationType } from "../models/applicationModel";
import { Request, Response } from "express";
import { ResponseAuthLocals, CreateAppRequest } from "../types/apiTypes";

export const getApplications = asyncHandler(async (_req, res: Response<ApplicationType[], ResponseAuthLocals>) => {
  const apps = await Application.find({ user: res.locals.user!._id }).select("-__v");
  res.status(200).json(apps);
});

export const createApplication = asyncHandler(
  async (req: CreateAppRequest, res: Response<ApplicationType, ResponseAuthLocals>) => {
    const { jobTitle, companyName, location, link, notes } = req.body;
    if (!jobTitle || !companyName || !location || !link) {
      res.status(400);
      throw new Error("Please enter all required fields");
    }

    const application = await Application.create({
      user: res.locals.user!._id,
      jobTitle,
      companyName,
      location,
      link,
      notes,
    });
    res.status(201).json(application.toJSON());
  }
);

export const getAppById = asyncHandler(
  async (req: Request<{ appId: string }>, res: Response<ApplicationType, ResponseAuthLocals>) => {
    const id = req.params.appId;

    const application = await Application.findById(id);
    // validate app exists
    if (!application) {
      res.status(404);
      throw new Error("application not found");
    }
    // validate if app belongs to this user
    if (application.user.toString() !== res.locals.user!._id.toString()) {
      res.status(401);
      throw new Error("not authorized");
    }

    res.status(200).json(application.toJSON());
  }
);

export const updateApplication = asyncHandler(
  async (req: Request<{ appId: string }>, res: Response<ApplicationType, ResponseAuthLocals>) => {
    const id = req.params.appId;
    const application = await Application.findById(id);
    // validate app exists
    if (!application) {
      res.status(404);
      throw new Error("application not found");
    }
    // validate if app belongs to this user
    if (application.user.toString() !== res.locals.user!._id.toString()) {
      res.status(401);
      throw new Error("not authorized");
    }

    const updatedApp = await Application.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedApp) {
      res.status(400);
      throw new Error("Error updating");
    }
    res.status(200).json(updatedApp.toJSON());
  }
);

export const deleteApplication = asyncHandler(
  async (
    req: Request<{ appId: string }>,
    res: Response<{ success: boolean; deletedApp: ApplicationType }, ResponseAuthLocals>
  ) => {
    const id = req.params.appId;
    const application = await Application.findById(id);
    // validate app exists
    if (!application) {
      res.status(404);
      throw new Error("application not found");
    }
    // validate if app belongs to this user
    if (application.user.toString() !== res.locals.user!._id.toString()) {
      res.status(401);
      throw new Error("not authorized");
    }
    await Application.deleteOne({ _id: id });
    res.status(200).json({ success: true, deletedApp: application.toJSON() });
  }
);

import mongoose, { Document, InferSchemaType, Types } from "mongoose";

enum Status {
  SENT = "Sent",
  REJECTED = "Rejected",
  OFFER = "Offer",
  IN_PROGRESS = "In progress",
}
interface IApplication extends Document<Types.ObjectId> {
  jobTitle: string;
  companyName: string;
  dateApplied: Date;
  link: string;
  location: string;
  status: Status;
  notes?: string;
}

const applicationSchema = new mongoose.Schema<IApplication>(
  {
    jobTitle: {
      type: String,
      required: [true, "please add a job title"],
    },
    companyName: {
      type: String,
      required: [true, "Please add a company name"],
    },
    dateApplied: {
      type: Date,
      required: [true, "Please add the date you applied"],
    },
    link: {
      type: String,
      required: [true, "Please add a link to the job posting"],
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
    },
    status: {
      type: String,
      enum: Status,
      required: true,
      default: Status.SENT,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model<IApplication>("Application", applicationSchema);
export type ApplicationType = InferSchemaType<typeof applicationSchema>;

export default Application;

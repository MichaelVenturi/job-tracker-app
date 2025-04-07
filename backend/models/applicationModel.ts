import mongoose, { Document, InferSchemaType, Types } from "mongoose";

enum Status {
  SENT = "Sent",
  REJECTED = "Rejected",
  OFFER = "Offer",
  IN_PROGRESS = "In progress",
}
interface IApplication extends Document<Types.ObjectId> {
  user: Types.ObjectId;
  jobTitle: string;
  companyName: string;
  link: string;
  location: string;
  status: Status;
  notes?: string;
  updatedAt: Date;
  dateApplied: Date;
}

const applicationSchema = new mongoose.Schema<IApplication>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    jobTitle: {
      type: String,
      required: [true, "please add a job title"],
    },
    companyName: {
      type: String,
      required: [true, "Please add a company name"],
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
    timestamps: {
      createdAt: "dateApplied",
    },
  }
);

applicationSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const Application = mongoose.model<IApplication>("Application", applicationSchema);

export type ApplicationType = InferSchemaType<typeof applicationSchema>;

export default Application;

import store from "../redux/store";

export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;

interface IStateStatus {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export type JobStatus = "Sent" | "Pending" | "Rejected" | "Offer";

export interface IApplication {
  _id: string;
  user: string;
  jobTitle: string;
  companyName: string;
  link: string;
  location: string;
  status: JobStatus;
  dateApplied: string;
  updatedAt: string;
  notes?: string;
}

export interface IAuthState extends IStateStatus {
  user: IUser | null;
}

export interface IApplicationState extends IStateStatus {
  apps: IApplication[];
  curApp: IApplication | null;
}

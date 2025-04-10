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

export interface IAuthState extends IStateStatus {
  user: IUser | null;
}

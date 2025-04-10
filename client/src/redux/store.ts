import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../types/stateTypes";
import { isAxiosError } from "axios";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<IRootState>();

export const errorHandler = (err: unknown) => {
  let message = "unknown error";
  if (isAxiosError(err)) {
    message = err.response?.data?.message || err.message;
  } else if (err instanceof Error) {
    message = err.message;
  } else if (typeof err === "string") {
    err.toString();
  }
  return message;
};

export default store;

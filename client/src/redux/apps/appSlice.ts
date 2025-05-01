import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { IApplicationState, IApplication, IRootState } from "../../types/stateTypes";
import appService from "./appService";
import { CreateAppRequest } from "../../types/apiTypes";
import { errorHandler } from "../store";

const initialState: IApplicationState = {
  apps: [],
  curApp: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getApplications = createAsyncThunk<IApplication[], void, { state: IRootState }>("apps/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token ?? "";
    return await appService.getApplications(token);
  } catch (err) {
    const message = errorHandler(err);
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAppById = createAsyncThunk<IApplication, string, { state: IRootState }>("apps/getById", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token ?? "";
    return await appService.getAppById(id, token);
  } catch (err) {
    const message = errorHandler(err);
    return thunkAPI.rejectWithValue(message);
  }
});

export const createApplication = createAsyncThunk<IApplication, CreateAppRequest, { state: IRootState }>("apps/create", async (appData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token ?? "";
    return await appService.createApplication(appData, token);
  } catch (err) {
    const message = errorHandler(err);
    return thunkAPI.rejectWithValue(message);
  }
});

const appSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    appReset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
    setCurApp: (state, action) => {
      state.curApp = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplications.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.apps = action.payload;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.apps.push(action.payload);
      })
      .addCase(getAppById.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.curApp = action.payload;
      })
      .addMatcher(isAnyOf(getApplications.pending, createApplication.pending, getAppById.pending), (state) => {
        state.isLoading = true;
      })

      .addMatcher(isAnyOf(getApplications.rejected, createApplication.rejected, getAppById.rejected), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { appReset, setCurApp } = appSlice.actions;
export default appSlice.reducer;

import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import authService from "./authService";
import { IAuthState, IUser } from "../../types/stateTypes";
import { CreateUserRequest, LoginUserRequest } from "../../types/apiTypes";
import { errorHandler } from "../store";
import { jwtDecode } from "jwt-decode";

// get user from localstorage
const localUser = localStorage.getItem("user");
let user = null;
if (localUser) {
  const token = JSON.parse(localUser).token;
  const decoded = jwtDecode(token);
  if (decoded.exp && Date.now() < decoded.exp * 1000) {
    user = JSON.parse(localUser);
  } else {
    localStorage.removeItem("user");
  }
}

const initialState: IAuthState = {
  user,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const register = createAsyncThunk<IUser, CreateUserRequest>("auth/register", async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (err) {
    const message = errorHandler(err);
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk<IUser, LoginUserRequest>("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (err) {
    const message = errorHandler(err);
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authReset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addMatcher(isAnyOf(register.pending, login.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(register.fulfilled, login.fulfilled), (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addMatcher(isAnyOf(register.rejected, login.rejected), (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});
export const { authReset } = authSlice.actions;
export default authSlice.reducer;

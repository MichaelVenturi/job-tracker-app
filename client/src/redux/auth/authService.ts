import axios from "axios";
import { CreateUserRequest, LoginUserRequest } from "../../types/apiTypes";

const API_URL = "/api/users";

const register = async (userData: CreateUserRequest) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData: LoginUserRequest) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => localStorage.removeItem("user");

const authService = {
  register,
  login,
  logout,
};
export default authService;

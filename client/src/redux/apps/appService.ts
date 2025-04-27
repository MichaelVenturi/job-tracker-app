import axios from "axios";
import { CreateAppRequest } from "../../types/apiTypes";

const API_URL = "/api/apps";

const getApplications = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getAppById = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

const createApplication = async (appData: CreateAppRequest, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, appData, config);
  return response.data;
};

const appService = {
  getApplications,
  getAppById,
  createApplication,
};
export default appService;

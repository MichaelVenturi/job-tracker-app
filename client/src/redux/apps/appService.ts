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
  createApplication,
};
export default appService;

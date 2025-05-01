export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}
export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface CreateAppRequest {
  jobTitle: string;
  companyName: string;
  link: string;
  location: string;
  notes?: string;
}

export interface UpdateAppRequest {
  id: string;
  body: {
    jobTitle?: string;
    companyName?: string;
    link?: string;
    location?: string;
    status?: string;
    notes?: string;
  };
}

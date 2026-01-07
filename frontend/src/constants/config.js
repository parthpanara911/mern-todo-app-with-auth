// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3200";

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  TASKS: "/tasks",
  TASK: (id) => `/task/${id}`,
  ADD_TASK: "/add-task",
  UPDATE_TASK: "/update-task",
  DELETE_TASK: (id) => `/delete/${id}`,
  DELETE_MULTIPLE: "/delete-multiple",
};


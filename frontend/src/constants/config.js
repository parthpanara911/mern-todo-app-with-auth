// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3200";

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  LOGOUT: "/logout",
  TODOS: "/todos",
  TODO: (id) => `/todos/${id}`,
  // CREATE: "/todos",
  // UPDATE: "/todos",
  // DELETE: (id) => `/todos/${id}`,
  // DELETE_MULTIPLE: "/todos",
};

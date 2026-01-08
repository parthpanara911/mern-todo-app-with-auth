import { API_BASE_URL, API_ENDPOINTS } from "../../constants/config.js";

export const todoApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TASKS}`, {
      credentials: "include",
    });
    return await response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TASK(id)}`, {
      credentials: "include",
    });
    return await response.json();
  },

  create: async (todoData) => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ADD_TASK}`, {
      method: "POST",
      body: JSON.stringify(todoData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  },

  update: async (todoData) => {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.UPDATE_TASK}`,
      {
        method: "PUT",
        body: JSON.stringify(todoData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return await response.json();
  },

  delete: async (id) => {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.DELETE_TASK(id)}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );
    return await response.json();
  },

  deleteMultiple: async (ids) => {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.DELETE_MULTIPLE}`,
      {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify(ids),   // Sends array of IDs
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return await response.json();
  },
};

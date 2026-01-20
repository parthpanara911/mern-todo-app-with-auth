import { API_BASE_URL, API_ENDPOINTS } from "../../constants/config.js";

export const todoApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TODOS}`, {
      credentials: "include",
    });
    return await response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TODO(id)}`, {
      credentials: "include",
    });
    return await response.json();
  },

  create: async (todoData) => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CREATE}`, {
      method: "POST",
      body: JSON.stringify(todoData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  },

  update: async (id, todoData) => {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.UPDATE(id)}`,
      {
        method: "PATCH",
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
      `${API_BASE_URL}${API_ENDPOINTS.DELETE(id)}`,
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
        body: JSON.stringify({ ids }), // Sends array of IDs
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return await response.json();
  },
};

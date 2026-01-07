import { API_BASE_URL, API_ENDPOINTS } from "../../constants/config.js";

/**
 * Task API service
 */
export const taskApi = {
  /**
   * Get all tasks
   * @returns {Promise<Object>} Response with tasks list
   */
  getTasks: async () => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TASKS}`, {
      credentials: "include",
    });
    return await response.json();
  },

  /**
   * Get single task by ID
   * @param {string} id - Task ID
   * @returns {Promise<Object>} Response with task data
   */
  getTask: async (id) => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TASK(id)}`, {
      credentials: "include",
    });
    return await response.json();
  },

  /**
   * Create new task
   * @param {Object} taskData - Task data { title, description }
   * @returns {Promise<Object>} Response with created task
   */
  createTask: async (taskData) => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ADD_TASK}`, {
      method: "POST",
      body: JSON.stringify(taskData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  },

  /**
   * Update existing task
   * @param {Object} taskData - Task data with _id
   * @returns {Promise<Object>} Response with updated task
   */
  updateTask: async (taskData) => {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.UPDATE_TASK}`,
      {
        method: "PUT",
        body: JSON.stringify(taskData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return await response.json();
  },

  /**
   * Delete single task
   * @param {string} id - Task ID
   * @returns {Promise<Object>} Response with deletion status
   */
  deleteTask: async (id) => {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.DELETE_TASK(id)}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );
    return await response.json();
  },

  /**
   * Delete multiple tasks
   * @param {Array<string>} taskIds - Array of task IDs
   * @returns {Promise<Object>} Response with deletion status
   */
  deleteMultipleTasks: async (taskIds) => {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.DELETE_MULTIPLE}`,
      {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify(taskIds),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return await response.json();
  },
};


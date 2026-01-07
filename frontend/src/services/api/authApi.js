import { API_BASE_URL, API_ENDPOINTS } from "../../constants/config.js";

/**
 * Authentication API service
 */
export const authApi = {
    /**
     * Login user
     * @param {Object} userData - User credentials { email, password }
     * @returns {Promise<Object>} Response with token and success status
     */
    login: async (userData) => {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    },

    /**
     * Sign up new user
     * @param {Object} userData - User data { name, email, password }
     * @returns {Promise<Object>} Response with token and success status
     */
    signup: async (userData) => {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SIGNUP}`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    },
};


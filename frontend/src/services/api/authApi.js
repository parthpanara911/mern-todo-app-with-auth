import { API_BASE_URL, API_ENDPOINTS } from "../../constants/config.js";

export const authApi = {
    login: async (userData) => {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
            method: "POST",
            body: JSON.stringify(userData),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    },

    signup: async (userData) => {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SIGNUP}`, {
            method: "POST",
            body: JSON.stringify(userData),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    },
};

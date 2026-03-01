import axios from "axios";

const API_URL = "http://localhost:5186/api/Auth";

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
        });
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
};

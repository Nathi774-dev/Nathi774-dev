import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
    headers: {"Content-Type": "application/json"}
})

// Here the JWT token is added to requests that need authentication
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("transcore_access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

// Handle any API errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;

// Authenticate API calls
export const authenticate = {
    login: async (email, password) => {
        const response = await api.post("/auth/login", { email, password });
        const { access_token, user } = response.data;

        if (access_token) {
            localStorage.setItem("transcore_access_token", access_token);
        }

        return { access_token, user };
    },
    register: async (userData) => {
        const response = await api.post("/auth/register", userData);
        return response.data;
    },
    getCurrentUser: async () => {
        const response = await api.get("/auth/me");
        return response.data;
    },
    logout: async() => {
        localStorage.removeItem("transcore_access_token");
    }
}

export const vehiclesApi = {
    getVehicles: async () => {
        const response = await api.get("/vehicles/");
        return response.data;
    },
    getVehicleById: async (vehicleId) => {
        const response = await api.get(`/vehicles/${vehicleId}`);
        return response.data;
    },
    updateVehicle: async (vehicleId, data) => {
        const response = await api.put(`/vehicles/${vehicleId}`, data);
        return response.data;
    },
    createVehicle: async (data) => {
        const response = await api.post("/vehicles/", data);
        return response.data;
    },
    getTelemetryHistory: async (vehicleId) => {
        const response = await api.get(`/vehicles/telemetry/${vehicleId}/history`);
        return response.data;
    }
}

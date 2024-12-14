import axios from "axios"

export const axiosInstance = axios.create(
    {
        baseURL: import.meta.env.MODE === "development" ? "http://localhost:3050/api":"/api",
        withCredentials:true,
    }
)
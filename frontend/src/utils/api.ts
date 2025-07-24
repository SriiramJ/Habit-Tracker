import axios from "axios"
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { toast } from 'sonner';
const api = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true,
    headers: {

        "Content-Type": "application/json"
    },
})

// Add a request interceptor to include token
api.interceptors.request.use(
    (config) => {
        const cookieHeader = config.headers.cookie
        const cookies = parseCookie(cookieHeader)
        const token = cookies.get('JwtToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config; // Return the modified config
    }
)

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        toast.error(error.response?.message || "An error occurred")
        return Promise.reject(error)
    }
)
export default api
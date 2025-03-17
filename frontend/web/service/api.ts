import axios from "axios";
import Cookies from "js-cookie";

const BaseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const instance = axios.create({
  baseURL: BaseURL, // Use the rewritten base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios Request Interceptor to add Authorization header
instance.interceptors.request.use(
  async function (config) {
    try {
      if (typeof window !== "undefined") {
        const token = Cookies.get("mkey");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      } else {
        console.error("Cannot access cookies on the server-side in Axios interceptor.");
      }
    } catch (error) {
      console.error("Failed to fetch token", error);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

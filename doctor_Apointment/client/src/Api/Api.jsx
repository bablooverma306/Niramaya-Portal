import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASEURL || "/api/v1"
});

API.interceptors.request.use((config) => {
  console.log("FULL localStorage:", localStorage.getItem("appData"));
  try {
    const localData = localStorage.getItem("appData");

    if (localData) {
      const appData = JSON.parse(localData);

      if (appData?.token) {
        // ✅ FIX: Bearer add kiya
        config.headers.Authorization = `Bearer ${appData.token}`;
      }
    }
  } catch (error) {
    console.log("Token Error:", error);
  }

  return config;
});

export default API;

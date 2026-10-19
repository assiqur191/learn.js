import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
  withCredentials: true, // Include credentials (cookies) in requests if needed
  headers: {
    "Content-Type": "application/json", // Set the content type for requests
  },
  timeout: 10000, // Set a timeout for requests (in milliseconds)
});

export default api;

import axios from "axios";

let AxiosService = axios.create({
  baseURL: "https://ems-be-7d5a.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies in cross-origin requests
});

export default AxiosService;
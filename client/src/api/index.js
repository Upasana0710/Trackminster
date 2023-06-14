import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// auth
export const login = (user) => API.post("/user/auth", user);

// task creation
export const createTask = (task, token) =>
  API.post(
    "/task/create",
    task,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true },
  );

// pie chart
export const pieData = (data) => API.post("/task/pie", data);

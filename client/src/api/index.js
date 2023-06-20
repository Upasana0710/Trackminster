import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// auth
export const login = (user) => API.post("/user/auth", user);

// employee list
export const getEmployees = () => API.get("/user/employees");
// employee by ID
export const getEmployee = (id) => API.get(`/user/${id}`);

// update employee
export const updateUser = (id, updatedUser) =>
  API.patch(`/user/${id}`, updatedUser);

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
// bar graph
export const barData = (data) => API.post("/task/bar", data);

import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const login = (user) => API.post("/user/auth", user);

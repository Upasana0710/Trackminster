import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

const login = (user) => API.post("/user/auth", user);

export default login;

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const saveSession = (data) => API.post("/sessions", data);
export const getSessions = () => API.get("/sessions");

import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.107:8080" //IVP4 PC
});

export default api;
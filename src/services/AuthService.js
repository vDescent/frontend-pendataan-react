import api from "./api";
import axios from "axios";

// Login email pw
export async function login(email, password) {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token } = response.data;
    localStorage.setItem("token", token);
    return token;
  } catch (err) {
    throw err;
  }
}

// Register nama, email, pw
export async function register(userData) {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (err) {
    throw err; 
  }
}

// Logout hapus token
export function logout() {
  localStorage.removeItem("token");
}

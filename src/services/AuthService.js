import api from "./api";

// Login: kirim email & password, dapatkan token
export async function login(email, password) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  const { token } = response.data;
  localStorage.setItem("token", token);
  return token;
}

// Register: kirim data lengkap
export async function register(userData) {
  const response = await api.post("/auth/register", userData);
  return response.data;
}

// Logout (hapus token)
export function logout() {
  localStorage.removeItem("token");
}

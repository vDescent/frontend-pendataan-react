import api from "./api"; 

export async function getRecentStaff() {
  const response = await api.get("/staff/last");
  return response.data;
}

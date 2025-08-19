import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import axios from "axios";
import useAutoLogout from "./hooks/useAutoLogout";

export default function App() {
  const navigate = useNavigate();
  // autologout global
  useAutoLogout(); 

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return <AppRouter />;
}

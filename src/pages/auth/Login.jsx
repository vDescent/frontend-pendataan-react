import { useState } from "react";
import { login } from "../../services/AuthService";
import { useNavigate, Link } from "react-router-dom";
import validateLogin from "../../utils/validateLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {email: email.trim(), password: password.trim()};
    const validationErrors = validateLogin(formData);

    if(Object.keys(validationErrors).length > 0){
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);

      const token = await login(email,password);
      localStorage.setItem("token", token);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      const backendMessage = err.response?.data || "Terjadi kesalahan saat login.";
      setErrors({ general: backendMessage });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#39363B] min-h-screen px-4 w-full">
      <h1 className="font-semibold text-[#9C94E8] text-5xl mb-10">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <h3 className="text-white mb-2 font-thin text-2xl">Email</h3>
        <input 
        type="text" 
        placeholder="Enter Your Email"
        className="w-full border px-3 py-2 rounded text-white my-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm m-0">{errors.email}</p>}

        <h3 className="text-white mb-2 font-thin text-2xl">Password</h3>
        <input 
        type="password"
        placeholder="Enter Your Password" 
        className="w-full border px-3 py-2 rounded text-white my-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        <button type="submit" disabled={loading} className="bg-[#3D2C51] border-2 border-[#9C94E8] text-white px-4 py-2 rounded-4xl w-full m-0 hover:bg-[#9C94E8] cursor-pointer">
          
          {loading ? "Loading..." : "Login"}
        </button>
        <p className="mt-4 text-center">
          <Link to="/register" className="text-[#9C94E8] hover:underline">
            Go to Register
          </Link>
        </p>
      </form>
      {errors.general && (
        <p className="text-red-500 text-sm text-center">{errors.general}</p>
      )}
    </div>
  );
}
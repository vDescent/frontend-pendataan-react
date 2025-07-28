import { useState } from "react";
import { login } from "../../services/AuthService";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      alert("Login gagal: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#39363B] min-h-screen px-4 w-full">
      <h1 className="font-semibold text-[#9C94E8] text-5xl mb-10">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <h3 className="text-white mb-2 font-thin text-2xl">Email</h3>
        <input 
        type="email" 
        placeholder="Enter Your Email"
        className="w-full border px-3 py-2 rounded text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <h3 className="text-white mb-2 font-thin text-2xl">Password</h3>
        <input 
        type="password"
        placeholder="Enter Your Password" 
        className="w-full border px-3 py-2 rounded text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-[#3D2C51] border-2 border-[#9C94E8] text-white px-4 py-2 rounded-4xl w-full m-0 hover:bg-[#9C94E8] cursor-pointer">Login</button>
        <p className="mt-4 text-center">
          <Link to="/register" className="text-[#9C94E8] hover:underline">
            Go to Register
          </Link>
        </p>
      </form>
    </div>
  );
}
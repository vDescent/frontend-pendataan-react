import { useState } from "react";
import { register } from "../../services/AuthService";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Registrasi berhasil!");
      navigate("/login");
    } catch (err) {
      alert("Registrasi gagal: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#39363B] min-h-screen px-4 w-full">
      <h1 className="font-semibold text-[#9C94E8] text-5xl mb-10">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <h3 className="text-white mb-2 font-thin text-2xl">Name</h3>
        <input
          type="text"
          name="nama"
          placeholder="Enter Your Name"
          className="w-full border px-3 py-2 rounded text-white"
          value={form.nama}
          onChange={handleChange}
        />
        <h3 className="text-white mb-2 font-thin text-2xl">Email</h3>
        <input 
          type="email" 
          name="email"
          placeholder="Enter Your Email"
          className="w-full border px-3 py-2 rounded text-white"
          value={form.email}
          onChange={handleChange}
        />
        <h3 className="text-white mb-2 font-thin text-2xl">Password</h3>
        <input 
          type="password"
          name="password"
          placeholder="Enter Your Password" 
          className="w-full border px-3 py-2 rounded text-white"
          value={form.password}
          onChange={handleChange}
        />
        <h3 className="text-white mb-2 font-thin text-2xl">Confirm Password</h3>
        <input
           type="password"
           name="confirmPassword"
           placeholder="Enter your password"
           className="w-full border px-3 py-2 rounded text-white"
           onChange={handleChange}
           value={form.confirmPassword}
         />
        <button type="submit" className="bg-[#3D2C51] border-2 border-[#9C94E8] text-white px-4 py-2 rounded-4xl w-full m-0 hover:bg-[#9C94E8] cursor-pointer">Register</button>
        <p className="mt-4 text-center">
          <Link to="/login" className="text-[#9C94E8] hover:underline">
            Go to Login
          </Link>
        </p>
      </form>
    </div>
  );
}
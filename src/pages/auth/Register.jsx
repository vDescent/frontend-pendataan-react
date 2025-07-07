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
    <div>
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nama"
          placeholder="Nama Lengkap"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          value={form.nama}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          value={form.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          value={form.password}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Konfirmasi Password"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          value={form.confirmPassword}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Go to Login
        </Link>
      </p>
    </div>
  );
}

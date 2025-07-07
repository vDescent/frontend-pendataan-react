import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register:", form);
    // nanti panggil register(form)
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
    </div>
  );
}

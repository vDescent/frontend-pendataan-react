import { useState } from "react";
import { register } from "../../services/AuthService";
import { useNavigate, Link } from "react-router-dom";
import validateRegister from "../../utils/validateRegister"; 

export default function Register() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    const validationErrors = validateRegister(form);
    if (form.password !== form.confirmPassword) {
      validationErrors.confirmPassword = "Password does not match";
    }

    setErrors(validationErrors);

    // 2. error
    // if (Object.keys(validationErrors).length > 0) {
    //   // setErrors(validationErrors);
    //   return;
    // }

    try {
      await register(form);
      alert("Registrasi berhasil!");
      navigate("/login");
    } catch (err) {
      const backendMessage = err.response?.data; // Ambil error msg dari backend
      setErrors((prev) => ({ ...prev, general: backendMessage || "Registrasi gagal." }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#39363B] min-h-screen px-4 w-full">
      <h1 className="font-semibold text-[#9C94E8] text-5xl mb-10">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        {/* nama */}
        <h3 className="text-white mb-2 font-thin text-2xl">Name</h3>
        <input
          type="text"
          name="nama"
          placeholder="Enter Your Name"
          className="w-full border px-3 py-2 rounded text-white"
          value={form.nama}
          onChange={handleChange}
        />
        {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}

        {/* email */}
        <h3 className="text-white mb-2 font-thin text-2xl">Email</h3>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className="w-full border px-3 py-2 rounded text-white"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* pw */}
        <h3 className="text-white mb-2 font-thin text-2xl">Password</h3>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          className="w-full border px-3 py-2 rounded text-white"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        {/* confir pw */}
        <h3 className="text-white mb-2 font-thin text-2xl">Confirm Password</h3>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Enter your password again"
          className="w-full border px-3 py-2 rounded text-white"
          onChange={handleChange}
          value={form.confirmPassword}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}

        <button
          type="submit"
          className="bg-[#3D2C51] border-2 border-[#9C94E8] text-white px-4 py-2 rounded-4xl w-full m-0 hover:bg-[#9C94E8] cursor-pointer"
        >
          Register
        </button>
        <p className="mt-4 text-center">
          <Link to="/login" className="text-[#9C94E8] hover:underline">
            Go to Login
          </Link>
        </p>
      </form>
      {errors.general && (
        <p className="text-red-500 text-sm text-center">{errors.general}</p>
      )}
    </div>
  );
}

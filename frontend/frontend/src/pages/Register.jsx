import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    register({
      username,
      password,
    })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          setError("Username already exists.");
        } else {
          setError("Registration failed.");
        }
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#668586] px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] bg-[#F7F7F9] p-10 shadow-2xl shadow-black/10 ring-1 ring-slate-200">
        <h2 className="text-2xl font-semibold text-center mb-8 text-slate-900">
          Create Account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#E86A92] focus:ring-2 focus:ring-[#E86A92]/20"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#E86A92] focus:ring-2 focus:ring-[#E86A92]/20"
          />

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            onClick={handleRegister}
            className="w-full rounded-2xl bg-[#E86A92] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#d85a82]"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;

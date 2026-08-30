import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { login } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = () => {
    login({
      username,
      password,
    })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));

        navigate("/");
      })
      .catch(() => {
        setError("Incorrect username or password");
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#668586] px-4 py-10">
      <div className="text-center mb-10 max-w-xl">
        <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-4xl">
          Welcome to Smart Home
        </h1>
      </div>

      <div className="w-full max-w-md rounded-[2rem] bg-[#F7F7F9] p-10 shadow-2xl shadow-black/10 ring-1 ring-slate-200">
        <h2 className="text-2xl font-semibold text-center mb-8 text-slate-900">
          Login to continue
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#E86A92] focus:ring-2 focus:ring-[#E86A92]/20"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#E86A92] focus:ring-2 focus:ring-[#E86A92]/20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-center text-sm text-red-600">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full rounded-2xl bg-[#E86A92] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#d85a82]"
          >
            Login
          </button>
          <p className="text-black mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

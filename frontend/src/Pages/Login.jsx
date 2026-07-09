import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.post("/users/login", {
        email,
        password,
      });

      const user = response.data.data.user;
      const accessToken = response.data.data.accessToken;

      localStorage.setItem("accessToken", accessToken);

      setUser(user);

      navigate("/");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Unable to login."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

        {/* Logo */}

        <div className="text-center">

          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg">

            <span className="text-4xl text-white">
              ▶
            </span>

          </div>

          <h1 className="mt-6 text-4xl font-black bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            NovaTube
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Welcome back! Sign in to continue.
          </p>

        </div>

        {/* Error */}

        {error && (

          <div className="mt-6 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-center">

            {error}

          </div>

        )}

        {/* Form */}

        <div className="space-y-6 mt-8">

          {/* Email */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            />

          </div>

          {/* Password */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border border-slate-300 rounded-xl p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-600 transition"
              >

                {showPassword ? (

                  <EyeOff size={20} />

                ) : (

                  <Eye size={20} />

                )}

              </button>

            </div>

          </div>

          {/* Login Button */}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 hover:scale-[1.02] disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition-all duration-300"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </div>

        {/* Footer */}

        <div className="text-center mt-8">

          <p className="text-slate-500">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-violet-600 hover:text-violet-700 font-semibold"
            >
              Sign Up
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;
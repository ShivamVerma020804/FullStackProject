import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      setError(err.response?.data?.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-5xl">🎥</h1>

          <h2 className="text-3xl font-bold mt-2 text-red-600">
            NovaTube
          </h2>

          <p className="text-gray-500 mt-2">
            Welcome back! Login to continue.
          </p>

        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-5 text-center">
            {error}
          </div>
        )}

        <div className="space-y-5">

          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full border rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-red-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>

          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        <p className="text-center text-gray-500 mt-6">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-red-500 font-semibold"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;
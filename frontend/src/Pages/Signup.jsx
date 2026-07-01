import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [avatarPreview, setAvatarPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = new FormData();

      data.append("fullName", formData.fullName);
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);

      if (avatar) {
        data.append("avatar", avatar);
      }

      if (coverImage) {
        data.append("coverImage", coverImage);
      }

      await registerUser(data);

      alert("Account created successfully!");

      navigate("/login");
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8">

        {/* Header */}

        <div className="text-center mb-8">

          <h1 className="text-5xl">🎥</h1>

          <h2 className="text-3xl font-bold text-red-600 mt-2">
            NovaTube
          </h2>

          <p className="text-gray-500 mt-2">
            Create your account
          </p>

        </div>

        {/* Error */}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-600 p-3 rounded-lg mb-5 text-center">
            {error}
          </div>
        )}

        {/* Form */}

        <form onSubmit={handleSignup} className="space-y-5">

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                name="fullName"
                placeholder="Enter Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Username
              </label>

              <input
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-red-500"
                required
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

          {/* Avatar */}

          <div>

            <label className="block mb-2 font-medium">
              Avatar <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => {
                const file = e.target.files[0];

                setAvatar(file);

                if (file) {
                  setAvatarPreview(URL.createObjectURL(file));
                }
              }}
            />

            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full mt-4 object-cover border-2 border-gray-300 shadow"
              />
            )}

          </div>

          {/* Cover */}

          <div>

            <label className="block mb-2 font-medium">
              Cover Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                setCoverImage(file);

                if (file) {
                  setCoverPreview(URL.createObjectURL(file));
                }
              }}
            />

            {coverPreview && (
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="w-full h-48 object-cover rounded-xl mt-4 border shadow"
              />
            )}

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 transition-all duration-300 hover:scale-[1.02] disabled:bg-gray-400 text-white p-3 rounded-lg font-semibold"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ImagePlus } from "lucide-react";

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

      if (avatar) data.append("avatar", avatar);
      if (coverImage) data.append("coverImage", coverImage);

      await registerUser(data);

      alert("Account created successfully!");

      navigate("/login");
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-10 px-4">

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

        {/* Logo */}

        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg">

            <span className="text-4xl text-white">
              ▶
            </span>

          </div>

          <h1 className="mt-5 text-4xl font-black bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            NovaTube
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Create your account and start sharing videos.
          </p>

        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-center">
            {error}
          </div>
        )}

        {/* Form */}

        <form
          onSubmit={handleSignup}
          className="space-y-6"
        >

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Username
              </label>

              <input
                name="username"
                placeholder="@johndoe"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
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
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
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
                required
                className="w-full border border-slate-300 rounded-xl p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-600"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Avatar */}

          <div>

            <label className="block mb-3 font-medium">
              Avatar *
            </label>

            <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-violet-500 hover:bg-violet-50 transition">

              <ImagePlus size={42} className="text-violet-600" />

              <p className="mt-3 font-semibold">
                Choose Avatar
              </p>

              <input
                hidden
                type="file"
                accept="image/*"
                required
                onChange={(e) => {
                  const file = e.target.files[0];

                  setAvatar(file);

                  if (file) {
                    setAvatarPreview(
                      URL.createObjectURL(file)
                    );
                  }
                }}
              />

            </label>

            {avatarPreview && (

              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover mt-5 border-4 border-violet-200 shadow"
              />

            )}

          </div>

          {/* Cover */}

          <div>

            <label className="block mb-3 font-medium">
              Cover Image
            </label>

            <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-violet-500 hover:bg-violet-50 transition">

              <ImagePlus size={42} className="text-violet-600" />

              <p className="mt-3 font-semibold">
                Choose Cover Image
              </p>

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  setCoverImage(file);

                  if (file) {
                    setCoverPreview(
                      URL.createObjectURL(file)
                    );
                  }
                }}
              />

            </label>

            {coverPreview && (

              <img
                src={coverPreview}
                alt="Cover"
                className="w-full h-52 rounded-2xl object-cover mt-5 shadow border border-slate-200"
              />

            )}

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 hover:scale-[1.02] disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition-all duration-300"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="text-center mt-8">

          <p className="text-slate-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-violet-600 font-semibold hover:text-violet-700"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;
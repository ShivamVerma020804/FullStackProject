import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">

      <div className="max-w-screen-2xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3 group"
        >

          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">

            <span className="text-white text-xl">
              ▶
            </span>

          </div>

          <div>

            <h1 className="text-2xl font-black bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">

              NovaTube

            </h1>

            <p className="text-xs text-gray-500 -mt-1 hidden sm:block">
              Share • Watch • Create
            </p>

          </div>

        </Link>

        {/* User */}

        <Link
          to="/profile"
          className="flex items-center gap-3 rounded-xl px-2 sm:px-3 py-2 hover:bg-violet-50 transition-all duration-300"
        >

          <img
            src={user?.avatar}
            alt={user?.username}
            className="w-11 h-11 rounded-full object-cover border-2 border-violet-200"
          />

          <div className="hidden md:block">

            <h3 className="font-semibold text-gray-800">
              {user?.username}
            </h3>

            <p className="text-sm text-gray-500">
              View Profile
            </p>

          </div>

        </Link>

      </div>

    </header>
  );
}

export default Navbar;
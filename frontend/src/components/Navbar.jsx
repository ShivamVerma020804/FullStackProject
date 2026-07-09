import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 h-16 bg-white border-b shadow-sm px-8 flex items-center justify-between">

      {/* Logo */}

      <Link
        to="/"
        className="flex items-center gap-2"
      >
        <span className="text-3xl">🎥</span>

        <h1 className="text-2xl font-bold text-red-600">
          NovaTube
        </h1>
      </Link>

      {/* User Profile */}

      <Link
        to="/profile"
        className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-xl transition duration-200"
      >
        <img
          src={user?.avatar}
          alt={user?.username}
          className="w-11 h-11 rounded-full object-cover border border-gray-300"
        />

        <div>
          <h3 className="font-semibold">
            {user?.username}
          </h3>

          <p className="text-sm text-gray-500">
            View Profile
          </p>
        </div>
      </Link>

    </header>
  );
}

export default Navbar;
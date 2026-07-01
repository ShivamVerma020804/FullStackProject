import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/", icon: "🏠" },
    { name: "Profile", path: "/profile", icon: "👤" },
    { name: "Upload", path: "/upload", icon: "📹" },
    { name: "Playlists", path: "/playlists", icon: "📂" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r p-5 flex flex-col">
      <div className="space-y-2">

        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-red-100 text-red-600 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}

      </div>

      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 hover:bg-red-600 text-white rounded-lg p-3"
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
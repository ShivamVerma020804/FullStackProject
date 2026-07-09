import {
  House,
  LayoutDashboard,
  User,
  Upload,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menu = [
    {
      name: "Home",
      path: "/",
      icon: <House size={20} />,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={20} />,
    },
    {
      name: "Upload",
      path: "/upload",
      icon: <Upload size={20} />,
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="hidden lg:flex w-64 min-h-screen bg-slate-50 border-r border-slate-200 flex-col p-5">

      <div className="space-y-2">

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-violet-100 text-violet-700 shadow-sm"
                  : "text-slate-700 hover:bg-violet-50 hover:text-violet-700"
              }`
            }
          >
            {item.icon}

            <span className="font-medium">
              {item.name}
            </span>
          </NavLink>
        ))}

      </div>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl py-3 font-semibold transition-all duration-300 hover:shadow-lg"
      >
        <LogOut size={18} />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;
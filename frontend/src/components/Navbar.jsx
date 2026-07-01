import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-3xl">🎥</span>
        <h1 className="text-2xl font-bold text-red-600">
          NovaTube
        </h1>
      </div>

      <input
        type="text"
        placeholder="Search videos..."
        className="w-96 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-red-500"
      />

      <div className="flex items-center gap-3">
        <img
          src={user?.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover border"
        />

        <div>
          <h3 className="font-semibold">
            {user?.username}
          </h3>

          <p className="text-sm text-gray-500">
            {user?.email}
          </p>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
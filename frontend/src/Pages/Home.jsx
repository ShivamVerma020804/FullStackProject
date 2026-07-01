import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome {user?.username}</h1>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

useEffect(() => {
  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        "http://localhost:8000/api/v1/users/current-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response.data);
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  getCurrentUser();
}, []);

const handleLogout = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.post(
      "http://localhost:8000/api/v1/users/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    localStorage.removeItem("accessToken");
    navigate("/login");

  } catch (error) {
    console.log(error);
  }
};
return (
  <div>
    <h1>Home Page</h1>

    {user && (
      <>
        <h2>Welcome {user.username}</h2>
        <p>{user.email}</p>

        <button onClick={handleLogout}>Logout</button>
      </>
    )}
  </div>
);
}

export default Home;
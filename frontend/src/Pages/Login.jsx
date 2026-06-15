import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      {
        email,
        password,
      }
    );
    const user = response.data.data.user;

console.log(user);

const accessToken = response.data.data.accessToken;

localStorage.setItem("accessToken", accessToken);
navigate("/");

    // console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
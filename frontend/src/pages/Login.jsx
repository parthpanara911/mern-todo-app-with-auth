import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/addtodo.css";
import { authApi } from "../services/api/authApi.js";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { isAuthenticated, loginUser } = useAuth();

  useEffect(() => {
    document.title = "Login - Todo App";
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    if (!userData.email || !userData.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const result = await authApi.login(userData);
      if (result.success) {
        loginUser(userData.email, result.token);
        navigate("/");
      } else {
        alert(result.msg || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <label htmlFor="email">Email</label>
      <input
        onChange={(event) =>
          setUserData({ ...userData, email: event.target.value })
        }
        type="text"
        name="email"
        placeholder="Enter user email"
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={(event) =>
          setUserData({ ...userData, password: event.target.value })
        }
        type="password"
        name="password"
        placeholder="Enter user password"
      />
      <button onClick={handleLogin} className="submit">
        Login
      </button>
      <Link className="link" to="/signup">
        Sign up
      </Link>
    </div>
  );
}


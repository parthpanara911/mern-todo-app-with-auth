import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/addtodo.css";
import { authApi } from "../services/api/authApi.js";
import { useAuth } from "../hooks/useAuth.js";

export default function SignUp() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { isAuthenticated, loginUser } = useAuth();

  useEffect(() => {
    document.title = "Sign Up - Todo App";
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSignUp = async () => {
    if (!userData.email || !userData.password || !userData.name) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const result = await authApi.signup(userData);
      if (result.success) {
        loginUser(userData.email, result.token);
        navigate("/");
      } else {
        alert(result.msg || "Failed to create account");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Failed to create account");
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>

      <label htmlFor="name">Name</label>
      <input
        onChange={(event) =>
          setUserData({ ...userData, name: event.target.value })
        }
        type="text"
        name="name"
        placeholder="Enter user name"
      />

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
      <button onClick={handleSignUp} className="submit">
        Sign up
      </button>
      <Link className="link" to="/login">
        Login
      </Link>
    </div>
  );
}


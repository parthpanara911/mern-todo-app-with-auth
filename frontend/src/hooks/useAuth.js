import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for authentication state management
 * @returns {Object} Auth state and methods
 */
export const useAuth = () => {
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = () => {
      setLogin(localStorage.getItem("login"));
    };
    window.addEventListener("localStorage-change", handleStorage);

    return () => {
      window.removeEventListener("localStorage-change", handleStorage);
    };
  }, []);

  const loginUser = (email, token) => {
    document.cookie = `token=${token}`;
    localStorage.setItem("login", email);
    window.dispatchEvent(new Event("localStorage-change"));
    setLogin(email);
  };

  const logout = () => {
    localStorage.removeItem("login");
    setLogin(null);
    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  const isAuthenticated = !!login;

  return {
    login,
    isAuthenticated,
    loginUser,
    logout,
  };
};


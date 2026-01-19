import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const loginUser = (email) => {
    localStorage.setItem("login", email); // Saves login state
    window.dispatchEvent(new Event("localStorage-change"));  // Notifies components
    setLogin(email); // Updates react state
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

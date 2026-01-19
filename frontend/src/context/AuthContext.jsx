import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/api/authApi.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await authApi.me();
                if (res?.success) {
                    setUser(res.user);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const loginUser = (user) => {
        setUser(user);
        navigate("/", { replace: true });
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } finally {
            setUser(null);
            navigate("/login", { replace: true });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                // isAuthenticated: user !== null,
                isAuthenticated: !!user,
                loading,
                loginUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
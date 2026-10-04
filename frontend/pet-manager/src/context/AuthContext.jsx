import api from "../services/authService";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const register = async (userData) => {
        try {
            setLoading(true);
            setError("");

            const response = await api.post("/register", userData);

            return response.data;

        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Kayıt sırasında bir hata oluştu."
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };

    const login = async (userData) => {
        try {
            setLoading(true);
            setError("");

            const response = await api.post("/login", userData);

            const token = response.data.token;

            setToken(token);
            setUser(response.data.user);

            localStorage.setItem("token", token);

            return response.data;

        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Giriş sırasında bir hata oluştu."
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };

    const getMe = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/me");

            setUser(response.data.user);

            return response.data.user;

        } catch (error) {
            console.log(error);

            setUser(null);
            setToken(null);
            localStorage.removeItem("token");

            setError(
                error.response?.data?.message ||
                "Kullanıcı bilgileri alınamadı."
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadUser = async () => {
            const storedToken = localStorage.getItem("token");

            if (!storedToken) {
                return;
            }

            try {
                await getMe();
            } catch (error) {
                console.log(error);
            }
        };

        loadUser();
    }, []);

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                error,
                register,
                login,
                getMe,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
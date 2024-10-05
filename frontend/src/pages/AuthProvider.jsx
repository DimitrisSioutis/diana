import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();
    const api = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await axios.get(`${api}/user/auth`, { withCredentials: true });
                setAuth({
                    accessToken: res.data.accessToken,
                    user: res.data.user
                });
            } catch (error) {
                console.error("User is not logged in", error);
                setAuth();
            }
        };

        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

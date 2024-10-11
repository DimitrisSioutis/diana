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
                setAuth(prevAuth => {
                    if (JSON.stringify(prevAuth) !== JSON.stringify({
                        accessToken: res.data.accessToken,
                        user: res.data.user
                    })) {
                        return {
                            accessToken: res.data.accessToken,
                            user: res.data.user
                        };
                    }
                    return prevAuth;
                });
            } catch (error) {
                console.error("User is not logged in", error);
                setAuth(prevAuth => prevAuth ? null : prevAuth);
            }
        };
    
        checkLoginStatus();
    }, [api]); 


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

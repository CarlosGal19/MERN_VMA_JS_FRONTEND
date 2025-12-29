import { createContext, useEffect, useState } from "react";
import axiosClient from '../Config/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        async function authUser() {
            const token = localStorage.getItem('vma_token');

            if (!token) {
                setAuth({});
                setLoading(false);
                return;
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const response = await axiosClient.get('veterinarian/profile', config);

                setAuth(response.data.data.userProfile);
            } catch {
                setAuth({});
            } finally {
                setLoading(false);
            }
        }
        authUser();
    }, []);

    const logout = () => {
        setAuth({});
        localStorage.removeItem('vma_token');
    }

    const updateProfile = async (profile) => {
        const token = localStorage.getItem('vma_token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const response = await axiosClient.patch('veterinarian', profile, config);

            return {
                msg: response.data.message,
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.message,
                error: true
            }
        }
    }

    const updatePassword = async (passwords) => {
        const token = localStorage.getItem('vma_token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const response = await axiosClient.patch('veterinarian/change-password', passwords, config);

            return {
                msg: response.data.message,
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.message,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            loading,
            logout,
            updateProfile,
            updatePassword
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;

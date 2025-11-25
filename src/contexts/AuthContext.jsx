import { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../lib/api';

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const data = await authAPI.getCurrentUser();
                setUser(data.user);
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('token');
            }
        }

        setLoading(false);
    };

    const signUp = async (fullName, email, password) => {
        const data = await authAPI.register(fullName, email, password);
        setUser(data.user);
        return data;
    };

    const signIn = async (email, password) => {
        const data = await authAPI.login(email, password);
        setUser(data.user);
        return data;
    };

    const signOut = async () => {
        authAPI.logout();
        setUser(null);
    };

    const value = {
        user,
        loading,
        signUp,
        signIn,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

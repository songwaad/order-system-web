import { apiLogin, apiLogout, apiMe, type AuthUser } from '@/api/auth';
import React, { useState, useContext, createContext, useEffect, useMemo } from 'react';

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    login: (identity: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // ตรวจสอบ auth เมื่อ app load
    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            setLoading(true);
            const res = await apiMe(controller.signal);
            if (res.ok) {
                setUser(res.data.user);
            } else {
                setUser(null);
            }
            setLoading(false);
        })();

        return () => controller.abort();
    }, []);

    const login = async (identity: string, password: string): Promise<{ success: boolean; error?: string }> => {
        const res = await apiLogin(identity, password);

        if (!res.ok) {
            return { success: false, error: res.error };
        }

        setUser(res.data.user);
        return { success: true };
    };

    const logout = async (): Promise<void> => {
        await apiLogout();
        setUser(null);
    };

    const value = useMemo<AuthContextType>(() => ({
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
    }), [user, loading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [role, setRole] = useState(localStorage.getItem('role') || null);

    const login = (newToken, newRole) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', newRole);
        setToken(newToken);
        setRole(newRole);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setToken(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
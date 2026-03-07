import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_BASE = process.env.REACT_APP_BACKEND_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isMaster = user?.role === 'master';
  const isPremium = user?.role === 'premium' || user?.role === 'master';

  useEffect(() => {
    const token = localStorage.getItem('schiro_token');
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => setUser(data))
      .catch(() => localStorage.removeItem('schiro_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('schiro_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('schiro_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isMaster, isPremium, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

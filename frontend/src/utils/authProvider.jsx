import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    console.log('AuthProvider mounting');
    // Check if there's a stored token when the app loads
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuth({ token });
      console.log('Token found in localStorage', token);
      console.log('Login successful');
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuth({ token });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
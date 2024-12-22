// src/auth/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from './authService';
import { MsalProvider } from "@azure/msal-react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
          // Check if there are any accounts
          const accounts = authService.msalInstance.getAllAccounts();
          if (accounts.length > 0) {
              setIsAuthenticated(true);
              setUser(accounts[0]);
          }
      } catch (error) {
          console.error("Auth initialization failed:", error);
          setIsAuthenticated(false);
          setUser(null);
      }
  };

    initAuth();
  }, []);

  const login = async () => {
    try {
      setLoading(true);
      const userData = await authService.login();
      //console.log(userData);
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <MsalProvider instance={authService.msalInstance}>
      <AuthContext.Provider value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout
      }}>
        {children}
      </AuthContext.Provider>
    </MsalProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setError(null);
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const result = await authService.login(email, password);
      if (result.success) {
        setUser(result.user);
      } else {
        setError(result.message);
      }
      return result;
    } catch (error) {
      const errorMessage = 'Network error occurred';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
      setError('Logout failed, but you have been logged out locally');
    }
  };

  const completeRegistration = async (password) => {
    try {
      setError(null);
      const result = await authService.completeRegistration(password);
      if (result.success) {
        setUser(result.user);
      } else {
        setError(result.message);
      }
      return result;
    } catch (error) {
      const errorMessage = 'Network error occurred';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const clearError = () => setError(null);
  const isAuthenticated = !!user;
  const updateUser = (userData) => setUser(prevUser => ({ ...prevUser, ...userData }));

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    completeRegistration,
    checkAuthStatus,
    clearError,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
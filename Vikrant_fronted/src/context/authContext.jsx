import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrationStep, setRegistrationStep] = useState(null); 

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setError(null);
      
      console.log('Checking auth status...');
      
      // First check if there's a pending registration
      let regStatus = null;
      try {
        regStatus = await authService.checkRegistrationStatus();
        console.log('Registration status:', regStatus);
      } catch (regError) {
        console.error('Registration status check failed:', regError);
      }
      
      // If user needs password setup, handle that first
      if (regStatus && regStatus.needsPasswordSetup) {
        console.log('User needs password setup');
        setUser(null); // No full user yet
        setRegistrationStep('password_setup');
        setLoading(false);
        return;
      }
      
      // Otherwise, get the current user
      const userData = await authService.getCurrentUser();
      console.log('Current user data:', userData);
      setUser(userData);
      setRegistrationStep('complete');
      
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setRegistrationStep(null);
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
        setRegistrationStep('complete');
      } else {
        setError(result.message);
      }
      return result;
    } catch (error) {
      const errorMessage = 'Network error occurred. Please try again.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await authService.logout();
      setUser(null);
      setRegistrationStep(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
      setRegistrationStep(null);
      setError('Logout failed, but you have been logged out locally');
      return { success: false, message: 'Logout failed' };
    }
  };

  const completeRegistration = async (password) => {
    try {
      setError(null);
      setLoading(true);
      const result = await authService.completeRegistration(password);
      
      if (result.success) {
        setUser(result.user);
        setRegistrationStep('complete');
        // Force a recheck to ensure consistent state
        setTimeout(() => checkAuthStatus(), 100);
      } else {
        setError(result.message);
      }
      return result;
    } catch (error) {
      const errorMessage = 'Network error occurred. Please try again.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);
  const isAuthenticated = !!user;
  const needsPasswordSetup = registrationStep === 'password_setup';
  const isRegistrationComplete = registrationStep === 'complete';
  
  const updateUser = (userData) => {
    setUser(prevUser => ({ ...prevUser, ...userData }));
    if (userData.passwordSet) {
      setRegistrationStep('complete');
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    needsPasswordSetup,
    isRegistrationComplete,
    registrationStep,
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

// Export the context as default
export default AuthContext;
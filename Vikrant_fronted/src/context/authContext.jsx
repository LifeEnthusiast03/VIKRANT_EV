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
    
    // Also check auth status when the page becomes visible (handles OAuth redirects)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Page became visible, checking auth status...');
        checkAuthStatus();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Check auth status when the window gains focus (handles OAuth redirects)
    const handleFocus = () => {
      console.log('Window gained focus, checking auth status...');
      checkAuthStatus();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const checkAuthStatus = async () => {
    try {
      setError(null);
      console.log('=== Checking auth status ===');
      
      // Add a small delay to ensure session is properly set after OAuth redirect
      if (window.location.search.includes('callback') || 
          document.referrer.includes('accounts.google.com') ||
          performance.navigation.type === 1) {
        console.log('Detected potential OAuth redirect, waiting for session...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // First check if there's a pending registration
      let regStatus = null;
      try {
        regStatus = await authService.checkRegistrationStatus();
        console.log('Registration status response:', regStatus);
      } catch (regError) {
        console.error('Registration status check failed:', regError);
        // If registration status fails, try to get user directly
        try {
          const userData = await authService.getCurrentUser();
          console.log('Got user directly:', userData);
          setUser(userData);
          setRegistrationStep('complete');
          setLoading(false);
          return;
        } catch (userError) {
          console.log('No user found, treating as unauthenticated');
          setUser(null);
          setRegistrationStep(null);
          setLoading(false);
          return;
        }
      }
      
      // If user needs password setup, handle that first
      if (regStatus && regStatus.needsPasswordSetup) {
        console.log('User needs password setup');
        setUser(null); // No full user yet
        setRegistrationStep('password_setup');
        setLoading(false);
        return;
      }
      
      // If registration status indicates user is authenticated but doesn't need setup
      if (regStatus && regStatus.isAuthenticated && !regStatus.needsPasswordSetup) {
        try {
          // Get the current user data
          const userData = await authService.getCurrentUser();
          console.log('Current user data:', userData);
          setUser(userData);
          setRegistrationStep('complete');
          setLoading(false);
          return;
        } catch (userError) {
          console.error('Failed to get user data:', userError);
          // Fall through to handle as unauthenticated
        }
      }
      
      // If no registration status or not authenticated, clear everything
      console.log('No authentication found, clearing state');
      setUser(null);
      setRegistrationStep(null);
      
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


import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';
import LoadingSpinner from '../common/Loadingspinner/loadingspinner';

const AuthGuard = ({ children, requirePasswordSetup = false }) => {
  const { 
    user, 
    loading, 
    needsPasswordSetup, 
    isAuthenticated
  } = useAuth();
  const location = useLocation();

  // Show loading spinner while auth is being determined
  if (loading) {
    return <LoadingSpinner />;
  }

  // For login page
  if (location.pathname === ROUTES.LOGIN) {
    // If user is fully authenticated and doesn't need password setup, redirect to home
    if (isAuthenticated && !needsPasswordSetup) {
      return <Navigate to={ROUTES.HOME} replace />;
    }
    // If user needs password setup, redirect there
    if (needsPasswordSetup) {
      return <Navigate to={ROUTES.SETUP_PASSWORD} replace />;
    }
    // Otherwise, show login page
    return children;
  }

  // For setup password page
  if (location.pathname === ROUTES.SETUP_PASSWORD) {
    // If user doesn't need password setup, redirect appropriately
    if (!needsPasswordSetup) {
      // If fully authenticated, go to home
      if (isAuthenticated) {
        return <Navigate to={ROUTES.HOME} replace />;
      }
      // If not authenticated at all, go to login
      return <Navigate to={ROUTES.LOGIN} replace />;
    }
    // If user needs password setup, show the setup page
    return children;
  }

  // For other protected routes that require password setup
  if (requirePasswordSetup && !needsPasswordSetup) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

export default AuthGuard;
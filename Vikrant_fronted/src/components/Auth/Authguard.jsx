

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
    if (isAuthenticated && !needsPasswordSetup) {
      return <Navigate to={ROUTES.HOME} replace />;
    }
    if (isAuthenticated && needsPasswordSetup) {
      return <Navigate to={ROUTES.SETUP_PASSWORD} replace />;
    }
    return children;
  }

  // For setup password page
  if (location.pathname === ROUTES.SETUP_PASSWORD) {
    if (!isAuthenticated && !needsPasswordSetup) {
      return <Navigate to={ROUTES.LOGIN} replace />;
    }
    if (isAuthenticated && !needsPasswordSetup) {
      return <Navigate to={ROUTES.HOME} replace />;
    }
    return children;
  }

  // For other protected routes that require password setup
  if (requirePasswordSetup && !needsPasswordSetup) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

export default AuthGuard;
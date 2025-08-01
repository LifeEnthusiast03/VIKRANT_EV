import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';
import LoadingSpinner from '../common/Loadingspinner/loadingspinner';

const ProtectedRoute = ({ 
  children, 
  redirectTo = ROUTES.LOGIN,
  requireCompleteRegistration = true 
}) => {
  const { 
    user, 
    loading, 
    isAuthenticated, 
    needsPasswordSetup 
  } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If user needs to complete registration and this route requires it
  if (requireCompleteRegistration && needsPasswordSetup) {
    return <Navigate to={ROUTES.SETUP_PASSWORD} replace />;
  }

  return children;
};

export default ProtectedRoute;
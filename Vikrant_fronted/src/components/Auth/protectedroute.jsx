import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';
import LoadingSpinner from '../common/Loadingspinner/loadingspinner';

const ProtectedRoute = ({ 
  children, 
  redirectTo = ROUTES.LOGIN 
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { ROUTES } from '../../utils/constants';
import LoadingSpinner from '../common/Loadingspinner/loadingspinner';

const AuthGuard = ({ children }) => {
  const { user, loading } = useAuth();
  const [checkingRegistration, setCheckingRegistration] = useState(false);
  const [needsPasswordSetup, setNeedsPasswordSetup] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      checkRegistrationStatus();
    }
  }, [user, loading]);

  const checkRegistrationStatus = async () => {
    try {
      setCheckingRegistration(true);
      const data = await authService.checkRegistrationStatus();
      setNeedsPasswordSetup(data.needsPasswordSetup);
    } catch (error) {
      console.error('Registration status check failed:', error);
      setNeedsPasswordSetup(false);
    } finally {
      setCheckingRegistration(false);
    }
  };

  if (loading || checkingRegistration) {
    return <LoadingSpinner />;
  }

  if (!user && needsPasswordSetup) {
    return <Navigate to={ROUTES.SETUP_PASSWORD} replace />;
  }

  return children;
};

export default AuthGuard;
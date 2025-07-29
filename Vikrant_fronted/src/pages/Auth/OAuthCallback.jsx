import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/Loadingspinner/loadingspinner';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { checkAuthStatus, isAuthenticated, needsPasswordSetup, loading } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      console.log('OAuth callback page loaded');
      
      // Wait a moment for the session to be established
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check authentication status
      await checkAuthStatus();
      
      // Give a bit more time for state to update
      setTimeout(() => {
        if (needsPasswordSetup) {
          console.log('Redirecting to password setup');
          navigate('/setup-password', { replace: true });
        } else if (isAuthenticated) {
          console.log('Redirecting to home (authenticated)');
          navigate('/', { replace: true });
        } else {
          console.log('Redirecting to login (not authenticated)');
          navigate('/login?error=auth_failed', { replace: true });
        }
      }, 500);
    };

    handleCallback();
  }, [checkAuthStatus, navigate, isAuthenticated, needsPasswordSetup]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <LoadingSpinner />
      <p style={{ marginTop: '20px' }}>Processing authentication...</p>
    </div>
  );
};

export default OAuthCallback;

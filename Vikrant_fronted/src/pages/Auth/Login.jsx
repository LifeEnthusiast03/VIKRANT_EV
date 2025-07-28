import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from './../../hooks/useAuth.js';
import { authService } from  '../../services/authService.js';
import { ROUTES } from '../../utils/constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  
  const { 
    login, 
    isAuthenticated, 
    needsPasswordSetup, 
    loading: authLoading,
    error: authError,
    clearError 
  } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || ROUTES.HOME;

  // Debug logging
  useEffect(() => {
    console.log('Auth State:', {
      isAuthenticated,
      needsPasswordSetup,
      authLoading,
      authError,
      localError,
      localLoading
    });
  }, [isAuthenticated, needsPasswordSetup, authLoading, authError, localError, localLoading]);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      if (needsPasswordSetup) {
        navigate(ROUTES.SETUP_PASSWORD, { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  }, [isAuthenticated, needsPasswordSetup, authLoading, navigate, from]);

  // Handle OAuth callback errors
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const authError = urlParams.get('error');
    if (authError === 'auth_failed') {
      setLocalError('Google authentication failed. Please try again.');
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, location.pathname, navigate]);

  // Clear errors when inputs change
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (localError) {
      setLocalError('');
    }
    if (authError) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted with:', { email: email.trim(), passwordLength: password.length });
    
    // Clear all errors
    setLocalError('');
    clearError();
    
    // Validation
    if (!email.trim() || !password.trim()) {
      setLocalError('Please enter both email and password');
      return;
    }

    // Set loading state
    setLocalLoading(true);

    try {
      console.log('Calling login function...');
      
      const result = await login(email.trim(), password);
      console.log('Login result:', result);
      
      if (result && result.success) {
        console.log('Login successful, should redirect');
        // Don't manually navigate - let useEffect handle it
      } else {
        console.log('Login failed, setting error:', result?.message);
        // Set error from result or fallback
        const errorMessage = result?.message || 'Login failed. Please check your credentials and try again.';
        setLocalError(errorMessage);
      }
    } catch (error) {
      console.error('Login exception:', error);
      setLocalError('An unexpected error occurred. Please try again.');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setLocalError('');
    clearError();
    window.location.href = authService.getGoogleLoginUrl();
  };

  // Determine what error to show
  const displayError = localError || authError;
  
  // Determine loading state
  const isLoading = localLoading || authLoading;

  // Show loading spinner during initial auth check
  if (authLoading && !localLoading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-lime-400/5 to-yellow-400/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lime-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Electric Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-lime-400/5 to-yellow-400/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lime-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-0 left-1/2 w-1 h-32 bg-gradient-to-b from-green-400/50 to-transparent transform -translate-x-1/2 animate-pulse delay-500"></div>
        <div className="absolute bottom-0 right-1/3 w-1 h-24 bg-gradient-to-t from-lime-400/50 to-transparent animate-pulse delay-700"></div>
      </div>
      
      {/* Login Card */}
      <div className="relative z-10 bg-black/90 backdrop-blur-md border border-green-500/40 rounded-2xl shadow-2xl p-8 w-full max-w-md hover:border-lime-400/60 transition-all duration-300">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-500/20 to-lime-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30 backdrop-blur-sm">
            <LogIn className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-2">Sign in to VIKRANT EV</p>
        </div>

        {/* Error Display */}
        {displayError && (
          <div className="bg-red-900/30 border border-red-500/40 text-red-300 px-4 py-3 rounded-lg mb-6 flex items-start backdrop-blur-sm">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm">{displayError}</span>
          </div>
        )}

        <div className="mb-6">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-gray-900/50 border border-green-500/30 text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-800/50 hover:border-green-400/50 hover:text-white focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-gray-500">Or sign in with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={handleInputChange(setEmail)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your email"
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleInputChange(setPassword)}
                className="w-full pl-4 pr-12 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your password"
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-lime-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/30"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400 mb-2">
            Don't have an account?{' '}
            <span className="text-green-400 font-medium">Sign up with Google above</span>
          </p>
          <Link
            to={ROUTES.HOME}
            className="text-green-400 hover:text-lime-400 text-sm font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Additional Electric Effects */}
      <div className="absolute top-1/2 left-10 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
      <div className="absolute top-1/3 right-20 w-1 h-1 bg-lime-400 rounded-full animate-ping delay-300"></div>
      <div className="absolute bottom-1/3 left-20 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping delay-700"></div>
    </div>
  );
};

export default Login;
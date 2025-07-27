import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, UserPlus, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';
import { ROUTES, AUTH_MESSAGES, PASSWORD_REQUIREMENTS } from '../../utils/constants';

const PasswordSetup = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  
  const { 
    completeRegistration, 
    needsPasswordSetup, 
    isAuthenticated,
    loading: authLoading,
    clearError,
    user
  } = useAuth();
  
  const navigate = useNavigate();

  // Clear errors when inputs change
  useEffect(() => {
    setError('');
    clearError();
  }, [password, confirmPassword, clearError]);

  // Handle redirect after completion
  useEffect(() => {
    if (!authLoading && isAuthenticated && !needsPasswordSetup) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [authLoading, isAuthenticated, needsPasswordSetup, navigate]);

  const validatePassword = (pwd) => {
    if (pwd.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
      return `Password must be at least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters long`;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError(AUTH_MESSAGES.PASSWORDS_DONT_MATCH);
      return;
    }

    setLoading(true);
    const result = await completeRegistration(password);
    
    if (result.success) {
      navigate(ROUTES.HOME, { replace: true });
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) {
      setError('');
    }
  };

  // Show loading during auth check
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Checking authentication status</p>
        </div>
      </div>
    );
  }

  const isPasswordValid = password.length >= PASSWORD_REQUIREMENTS.MIN_LENGTH;
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Complete Registration</h1>
          <p className="text-gray-600 mt-2">
            {user?.email ? `Welcome ${user.email}!` : 'Welcome!'} Set up your password to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleInputChange(setPassword)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-colors ${
                  isPasswordValid ? 'border-green-300 focus:ring-2 focus:ring-green-500 focus:border-transparent' :
                  password.length > 0 ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent' :
                  'border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent'
                }`}
                placeholder="Enter your password"
                required
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Password requirements indicator */}
            <div className={`mt-2 text-sm transition-opacity ${passwordFocused || password.length > 0 ? 'opacity-100' : 'opacity-0'}`}>
              <div className={`flex items-center ${isPasswordValid ? 'text-green-600' : 'text-gray-500'}`}>
                {isPasswordValid ? (
                  <Check className="w-4 h-4 mr-1" />
                ) : (
                  <div className="w-4 h-4 mr-1 border border-gray-300 rounded-full"></div>
                )}
                At least {PASSWORD_REQUIREMENTS.MIN_LENGTH} characters
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={handleInputChange(setConfirmPassword)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-colors ${
                  confirmPassword.length > 0 ? (
                    doPasswordsMatch ? 'border-green-300 focus:ring-2 focus:ring-green-500 focus:border-transparent' :
                    'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                  ) : 'border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent'
                }`}
                placeholder="Confirm your password"
                required
                disabled={loading}
                autoComplete="new-password"
              />
            </div>
            
            {/* Password match indicator */}
            {confirmPassword.length > 0 && (
              <div className={`mt-2 text-sm flex items-center ${doPasswordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                {doPasswordsMatch ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Passwords match
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Passwords don't match
                  </>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !isPasswordValid || !doPasswordsMatch}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Setting Up...
              </div>
            ) : (
              'Complete Registration'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            By completing registration, you agree to our terms of service
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordSetup;
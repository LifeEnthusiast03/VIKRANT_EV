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
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Multiple Layer Background Effects */}
        
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-black via-black to-lime-950"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              animation: 'grid-move 25s linear infinite'
            }}
          ></div>
        </div>
        
        {/* Diagonal Grid Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(132, 204, 22, 0.2) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(132, 204, 22, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              animation: 'diagonal-move 30s linear infinite reverse'
            }}
          ></div>
        </div>

        {/* Circuit Board Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.4) 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, rgba(132, 204, 22, 0.4) 2px, transparent 2px),
                radial-gradient(circle at 25% 75%, rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                radial-gradient(circle at 75% 25%, rgba(132, 204, 22, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px, 80px 80px, 40px 40px, 40px 40px',
              animation: 'circuit-pulse 8s ease-in-out infinite'
            }}
          ></div>
        </div>

        {/* Large Floating Energy Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-3xl animate-bounce" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-bl from-lime-500/25 to-transparent rounded-full blur-3xl animate-bounce" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-yellow-500/15 to-transparent rounded-full blur-3xl animate-bounce" style={{ animationDuration: '7s', animationDelay: '4s' }}></div>
        
        {/* Scanning Lines Effect */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-scan"></div>
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-lime-400 to-transparent animate-scan-slow"></div>
        </div>
        
        {/* Hexagonal Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
                <polygon fill="none" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="1" points="50,1 93,25 93,75 50,99 7,75 7,25"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" className="animate-pulse"/>
          </svg>
        </div>

        {/* Particle Effect Spots */}
        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-lime-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>

        {/* Enhanced CSS Animations */}
        <style jsx>{`
          @keyframes grid-move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(40px, 40px); }
          }
          
          @keyframes diagonal-move {
            0% { transform: translate(0, 0) rotate(0deg); }
            100% { transform: translate(60px, 60px) rotate(360deg); }
          }
          
          @keyframes circuit-pulse {
            0%, 100% { opacity: 0.15; transform: scale(1); }
            50% { opacity: 0.25; transform: scale(1.05); }
          }
          
          @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
            animation-duration: 4s;
          }
          
          @keyframes scan-slow {
            0% { top: 0%; opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { top: 100%; opacity: 0; }
            animation-duration: 6s;
            animation-delay: 2s;
          }
        `}</style>

        <div className="bg-black/90 backdrop-blur-md border border-green-500/40 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading...</h2>
          <p className="text-gray-300">Checking authentication status</p>
        </div>
      </div>
    );
  }

  const isPasswordValid = password.length >= PASSWORD_REQUIREMENTS.MIN_LENGTH;
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Multiple Layer Background Effects */}
      
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-black via-black to-lime-950"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'grid-move 25s linear infinite'
          }}
        ></div>
      </div>
      
      {/* Diagonal Grid Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(132, 204, 22, 0.2) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(132, 204, 22, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'diagonal-move 30s linear infinite reverse'
          }}
        ></div>
      </div>

      {/* Circuit Board Pattern */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.4) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(132, 204, 22, 0.4) 2px, transparent 2px),
              radial-gradient(circle at 25% 75%, rgba(34, 197, 94, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 75% 25%, rgba(132, 204, 22, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 80px 80px, 40px 40px, 40px 40px',
            animation: 'circuit-pulse 8s ease-in-out infinite'
          }}
        ></div>
      </div>

      {/* Large Floating Energy Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-3xl animate-bounce" style={{ animationDuration: '6s' }}></div>
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-bl from-lime-500/25 to-transparent rounded-full blur-3xl animate-bounce" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-yellow-500/15 to-transparent rounded-full blur-3xl animate-bounce" style={{ animationDuration: '7s', animationDelay: '4s' }}></div>
      
      {/* Scanning Lines Effect */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-scan"></div>
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-lime-400 to-transparent animate-scan-slow"></div>
      </div>
      
      {/* Hexagonal Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
              <polygon fill="none" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="1" points="50,1 93,25 93,75 50,99 7,75 7,25"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" className="animate-pulse"/>
        </svg>
      </div>

      {/* Particle Effect Spots */}
      <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-lime-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        @keyframes diagonal-move {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(60px, 60px) rotate(360deg); }
        }
        
        @keyframes circuit-pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
        
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
          animation-duration: 4s;
        }
        
        @keyframes scan-slow {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
          animation-duration: 6s;
          animation-delay: 2s;
        }
      `}</style>
      <div className="bg-black/90 backdrop-blur-md border border-green-500/40 rounded-2xl shadow-2xl p-8 w-full max-w-md hover:border-lime-400/60 transition-all duration-300 relative z-10">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-500/20 to-lime-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
            <UserPlus className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent mb-2">
            Complete Registration
          </h1>
          <p className="text-gray-300">
            {user?.email ? (
              <>Welcome <span className="text-green-400">{user.email}</span>!</>
            ) : (
              'Welcome!'
            )} Set up your password to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-300 px-4 py-3 rounded-lg mb-6 flex items-start backdrop-blur-sm">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
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
                className={`w-full pl-10 pr-12 py-3 bg-black/50 border rounded-lg transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-sm ${
                  isPasswordValid ? 'border-green-500/60 focus:ring-2 focus:ring-green-500/50 focus:border-green-400 shadow-lg shadow-green-500/20' :
                  password.length > 0 ? 'border-red-500/60 focus:ring-2 focus:ring-red-500/50 focus:border-red-400 shadow-lg shadow-red-500/20' :
                  'border-green-500/40 focus:ring-2 focus:ring-green-500/50 focus:border-green-400'
                }`}
                placeholder="Enter your password"
                required
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors disabled:cursor-not-allowed"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Password requirements indicator */}
            <div className={`mt-2 text-sm transition-opacity ${passwordFocused || password.length > 0 ? 'opacity-100' : 'opacity-0'}`}>
              <div className={`flex items-center ${isPasswordValid ? 'text-green-400' : 'text-gray-400'}`}>
                {isPasswordValid ? (
                  <Check className="w-4 h-4 mr-1" />
                ) : (
                  <div className="w-4 h-4 mr-1 border border-gray-500 rounded-full"></div>
                )}
                At least {PASSWORD_REQUIREMENTS.MIN_LENGTH} characters
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={handleInputChange(setConfirmPassword)}
                className={`w-full pl-10 pr-4 py-3 bg-black/50 border rounded-lg transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-sm ${
                  confirmPassword.length > 0 ? (
                    doPasswordsMatch ? 'border-green-500/60 focus:ring-2 focus:ring-green-500/50 focus:border-green-400 shadow-lg shadow-green-500/20' :
                    'border-red-500/60 focus:ring-2 focus:ring-red-500/50 focus:border-red-400 shadow-lg shadow-red-500/20'
                  ) : 'border-green-500/40 focus:ring-2 focus:ring-green-500/50 focus:border-green-400'
                }`}
                placeholder="Confirm your password"
                required
                disabled={loading}
                autoComplete="new-password"
              />
            </div>
            
            {/* Password match indicator */}
            {confirmPassword.length > 0 && (
              <div className={`mt-2 text-sm flex items-center ${doPasswordsMatch ? 'text-green-400' : 'text-red-400'}`}>
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
            className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-lime-600 focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/30"
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
          <p className="text-sm text-gray-400">
            By completing registration, you agree to our terms of service
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordSetup;
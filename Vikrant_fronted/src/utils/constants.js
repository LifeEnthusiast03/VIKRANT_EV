export const API_BASE_URL = import.meta.env.BACKEND_URL||'https://vikrant-ev-backend.vercel.app';

export const ROUTES = {
  HOME: '/',
  TEAM: '/team',
  PROJECT: '/projects',
  CONTACT: '/contact',
  DASHBOARD: '/dashboard',
  SERVICE: '/service',
  LOGIN: '/login',
  SETUP_PASSWORD: '/setup-password',
};

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logged out successfully', 
  REGISTRATION_SUCCESS: 'Registration completed successfully',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters long',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  INVALID_CREDENTIALS: 'Invalid email or password',
  REGISTRATION_INCOMPLETE: 'Please complete your registration by setting up a password',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.'
};

export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 6,
  REQUIRE_UPPERCASE: false,
  REQUIRE_LOWERCASE: false,
  REQUIRE_NUMBERS: false,
  REQUIRE_SPECIAL_CHARS: false
};
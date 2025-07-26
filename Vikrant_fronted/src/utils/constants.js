export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const ROUTES = {
  HOME: '/',
  TEAM: '/team',
  PROJECT: '/projects',
  CONTACT: '/contact',
  DASHBOARD: '/dashboard',
  SERVICE: '/service',
  LOGIN: '/login',
  SETUP_PASSWORD: '/setup-password'
};

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logged out successfully', 
  REGISTRATION_SUCCESS: 'Registration completed successfully',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters long',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  NETWORK_ERROR: 'Network error occurred'
};
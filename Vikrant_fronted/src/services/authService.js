
import { API_BASE_URL } from '../utils/constants';

class AuthService {
  async getCurrentUser() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.user;
      }
      
      if (response.status === 401) {
        throw new Error('Not authenticated');
      }
      
      throw new Error('Failed to fetch user data');
    } catch (error) {
      if (error.message === 'Not authenticated') {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return { success: true, user: data.user };
      } else {
        return { 
          success: false, 
          message: data.message || 'Login failed', 
          hint: data.hint 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        message: 'Network error occurred. Please check your connection.' 
      };
    }
  }

  async logout() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok && response.status !== 401) {
        throw new Error('Logout failed');
      }
      
      return { success: true };
    } catch (error) {
      throw new Error('Logout failed');
    }
  }

  async completeRegistration(password) {
    try {
      console.log('Attempting to complete registration...');
      const response = await fetch(`${API_BASE_URL}/auth/complete-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });
      
      console.log('Complete registration response status:', response.status);
      const data = await response.json();
      console.log('Complete registration response data:', data);
      
      if (response.ok) {
        return { success: true, user: data.user };
      } else {
        return { 
          success: false, 
          message: data.message || 'Registration completion failed',
          error: data.error || null
        };
      }
    } catch (error) {
      console.error('Complete registration network error:', error);
      return { 
        success: false, 
        message: 'Network error occurred. Please try again.',
        error: error.message
      };
    }
  }

  async checkRegistrationStatus() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/registration-status`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      if (response.status === 401) {
        return { needsPasswordSetup: false };
      }
      
      throw new Error('Failed to check registration status');
    } catch (error) {
      throw new Error('Failed to check registration status');
    }
  }

  getGoogleLoginUrl() {
    return `${API_BASE_URL}/auth/google`;
  }

  // Helper method to handle OAuth callback
  async handleOAuthCallback() {
    try {
      // This would be called after Google OAuth redirect
      const userData = await this.getCurrentUser();
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, message: 'OAuth authentication failed' };
    }
  }
}

export const authService = new AuthService();
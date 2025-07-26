

import { API_BASE_URL } from '../utils/constants';

class AuthService {
  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      credentials: 'include'
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.user;
    }
    throw new Error('Not authenticated');
  }

  async login(email, password) {
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
      return { success: false, message: data.message, hint: data.hint };
    }
  }

  async logout() {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Logout failed');
    }
  }

  async completeRegistration(password) {
    const response = await fetch(`${API_BASE_URL}/auth/complete-registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, user: data.user };
    } else {
      return { success: false, message: data.message };
    }
  }

  async checkRegistrationStatus() {
    const response = await fetch(`${API_BASE_URL}/auth/registration-status`, {
      credentials: 'include'
    });
    
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to check registration status');
  }

  getGoogleLoginUrl() {
    return `${API_BASE_URL}/auth/google`;
  }
}

export const authService = new AuthService();
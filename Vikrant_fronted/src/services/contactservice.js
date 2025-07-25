// contactService.js
const API_BASE_URL =  'https://haquenichbackend.vercel.app';

class ContactService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api`;
  }

  // Submit contact form data
  async submitContactForm(contactData) {
    try {
      const response = await fetch(`${this.baseURL}/contact-us`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit contact form');
      }

      return {
        success: true,
        data: data.data,
        message: data.message
      };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw new Error(error.message || 'Network error occurred');
    }
  }

  // Get all contacts (admin functionality)
  async getAllContacts() {
    try {
      const response = await fetch(`${this.baseURL}/contacts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch contacts');
      }

      return {
        success: true,
        data: data.data,
      };
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw new Error(error.message || 'Network error occurred');
    }
  }

  // Validate contact data before submission
  validateContactData(contactData) {
    const errors = {};

    if (!contactData.name || contactData.name.trim().length === 0) {
      errors.name = 'Name is required';
    }

    if (!contactData.email || contactData.email.trim().length === 0) {
      errors.email = 'Email is required';
    } else if (!this.isValidEmail(contactData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!contactData.message || contactData.message.trim().length === 0) {
      errors.message = 'Message is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Email validation helper
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Create and export a singleton instance
const contactService = new ContactService();
export default contactService;
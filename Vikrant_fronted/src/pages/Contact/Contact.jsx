import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import contactService from '../../services/contactservice.js'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setFieldErrors({});

    try {
      // Validate form data
      const validation = contactService.validateContactData(formData);
      
      if (!validation.isValid) {
        setFieldErrors(validation.errors);
        setSubmitStatus('error');
        setStatusMessage('Please fix the errors below');
        return;
      }

      // Submit form data
      const result = await contactService.submitContactForm(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setStatusMessage('Thank you for your message! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClasses = "w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border rounded-lg focus:outline-none transition-all duration-300";
    if (fieldErrors[fieldName]) {
      return `${baseClasses} border-red-500 focus:border-red-400`;
    }
    return `${baseClasses} border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-20 overflow-hidden">
      {/* Enhanced Dynamic Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 70% 30%, 
              rgba(34, 197, 94, 0.15) 0%, 
              rgba(132, 204, 22, 0.1) 30%,
              rgba(234, 179, 8, 0.08) 60%, 
              transparent 100%)`
          }}
        />
      </div>
      
      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-lime-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-3/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 via-lime-500/20 to-yellow-500/20 rounded-full border border-green-500/40 backdrop-blur-sm mb-8">
            <span className="text-sm font-bold bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
              Get In Touch With Us
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent">
              Contact
            </span>
            <span className="bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent"> Us</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to revolutionize your ride? Get in touch with us to learn more about our electric bike
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-lime-400/5 to-yellow-400/5 opacity-50" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                Send us a message
              </h3>
              
              {/* Status Message */}
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
                  submitStatus === 'success' 
                    ? 'bg-green-500/20 border border-green-500/50 text-green-300' 
                    : 'bg-red-500/20 border border-red-500/50 text-red-300'
                }`}>
                  {submitStatus === 'success' ? (
                    <CheckCircle size={20} />
                  ) : (
                    <AlertCircle size={20} />
                  )}
                  <span>{statusMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-green-400">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={getInputClassName('name')}
                    disabled={isSubmitting}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1 text-sm text-red-400">{fieldErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-green-400">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={getInputClassName('email')}
                    disabled={isSubmitting}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-green-400">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={getInputClassName('phone')}
                    disabled={isSubmitting}
                  />
                  {fieldErrors.phone && (
                    <p className="mt-1 text-sm text-red-400">{fieldErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-green-400">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`${getInputClassName('message')} resize-none`}
                    disabled={isSubmitting}
                  ></textarea>
                  {fieldErrors.message && (
                    <p className="mt-1 text-sm text-red-400">{fieldErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-all transform flex items-center justify-center space-x-2 ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-green-500 via-lime-500 to-yellow-500 hover:from-green-600 hover:via-lime-600 hover:to-yellow-600 hover:scale-105 shadow-lg shadow-green-500/30'
                  }`}
                >
                  <Send size={20} />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-lime-400/5 to-yellow-400/5 opacity-50" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                  Get in Touch
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="text-green-400 mt-1" size={24} />
                    <div>
                      <div className="font-semibold text-lime-400">Email</div>
                      <div className="text-gray-300">info@electricbike.com</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="text-lime-400 mt-1" size={24} />
                    <div>
                      <div className="font-semibold text-lime-400">Phone</div>
                      <div className="text-gray-300">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-yellow-400 mt-1" size={24} />
                    <div>
                      <div className="font-semibold text-lime-400">Address</div>
                      <div className="text-gray-300">
                        123 Innovation Drive<br />
                        Tech City, TC 12345
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-lime-400/5 to-yellow-400/5 opacity-50" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                  Office Hours
                </h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-green-400 font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-lime-400 font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-yellow-400 font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
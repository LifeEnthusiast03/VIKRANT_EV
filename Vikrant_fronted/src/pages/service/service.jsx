import React, { useState } from 'react';
import { Wrench, Clock, CheckCircle, AlertCircle, Calendar, User, Mail, Phone, MapPin } from 'lucide-react';

const ServiceBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bikeModel: '',
    serviceType: '',
    issueDescription: '',
    preferredDate: '',
    preferredTime: ''
  });

  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, loading, success, error
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const serviceTypes = [
    { value: 'basic-maintenance', label: 'Basic Maintenance', description: 'Battery check, tire pressure, brake adjustment' },
    { value: 'battery-service', label: 'Battery Service', description: 'Battery diagnosis, replacement, optimization' },
    { value: 'motor-repair', label: 'Motor Repair', description: 'Motor diagnosis, repair, replacement' },
    { value: 'brake-service', label: 'Brake Service', description: 'Brake pad replacement, cable adjustment' },
    { value: 'full-service', label: 'Full Service', description: 'Complete bike inspection and maintenance' },
    { value: 'custom-repair', label: 'Custom Repair', description: 'Specific issue repair based on description' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address || 
        !formData.bikeModel || !formData.serviceType || !formData.preferredDate || !formData.preferredTime) {
      setErrorMessage('Please fill in all required fields.');
      setBookingStatus('error');
      return;
    }

    setBookingStatus('loading');
    setErrorMessage('');

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/service-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setEstimatedTime(result.estimatedTime);
      setBookingStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          bikeModel: '',
          serviceType: '',
          issueDescription: '',
          preferredDate: '',
          preferredTime: ''
        });
        setBookingStatus('idle');
        setEstimatedTime(null);
      }, 5000);

    } catch (error) {
      console.error('Error submitting booking:', error);
      setErrorMessage('Failed to submit booking. Please try again.');
      setBookingStatus('error');
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Tomorrow at earliest
    return today.toISOString().split('T')[0];
  };

  if (bookingStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 px-4 overflow-hidden">
        {/* Enhanced Dynamic Background */}
        <div className="fixed inset-0 opacity-30 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, 
                rgba(34, 197, 94, 0.15) 0%, 
                rgba(132, 204, 22, 0.1) 30%,
                rgba(234, 179, 8, 0.08) 60%, 
                transparent 100%)`
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-lime-400/5 to-yellow-400/5 opacity-50" />
            
            <div className="relative z-10 mb-6">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent mb-2">Booking Confirmed!</h2>
              <p className="text-gray-300">Your service request has been successfully submitted.</p>
            </div>
            
            {estimatedTime && (
              <div className="bg-gradient-to-r from-green-500/20 to-lime-500/20 border border-green-500/30 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-green-400 mr-2" />
                  <span className="text-lg font-semibold text-green-400">Estimated Service Time</span>
                </div>
                <p className="text-2xl font-bold text-white">{estimatedTime}</p>
              </div>
            )}
            
            <div className="text-gray-300 space-y-2">
              <p>We'll contact you within 24 hours to confirm your appointment.</p>
              <p>A confirmation email has been sent to <span className="text-green-400">{formData.email}</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 px-4 overflow-hidden">
      {/* Brand Title */}
 
      
      {/* Enhanced Dynamic Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 70%, 
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
        <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-lime-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-2/3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 via-lime-500/20 to-yellow-500/20 rounded-full border border-green-500/40 backdrop-blur-sm mb-8">
            <Wrench className="w-6 h-6 text-green-400 mr-3" />
            <span className="text-sm font-bold bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
              Professional Service Booking
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent">
              Service
            </span>
            <span className="bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent"> Booking</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Book a professional service for your electric bike. Our expert technicians will get you back on the road quickly.
          </p>
        </div>

        {/* Service Types Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {serviceTypes.map((service) => (
            <div
              key={service.value}
              onClick={() => setFormData(prev => ({ ...prev, serviceType: service.value }))}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                formData.serviceType === service.value
                  ? 'bg-gradient-to-br from-green-500/20 to-lime-500/20 border-green-500 shadow-lg shadow-green-500/20'
                  : 'bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl border-gray-700 hover:bg-gray-800/50 hover:border-green-500/30'
              }`}
            >
              {formData.serviceType === service.value && (
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-lime-400/10 to-yellow-400/10 opacity-50" />
              )}
              <div className="relative z-10">
                <h3 className={`font-semibold mb-2 ${
                  formData.serviceType === service.value ? 'text-green-400' : 'text-white'
                }`}>
                  {service.label}
                </h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-lime-400/5 to-yellow-400/5 opacity-50" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-green-400" />
                Personal Information
              </h3>
              
              <div>
                <label className="block text-gray-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all resize-none"
                  placeholder="Enter your full address"
                />
              </div>
            </div>

            {/* Service Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-lime-400 to-yellow-400 bg-clip-text text-transparent mb-4 flex items-center">
                <Wrench className="w-5 h-5 mr-2 text-lime-400" />
                Service Details
              </h3>

              <div>
                <label className="block text-gray-300 mb-2">Bike Model *</label>
                <input
                  type="text"
                  name="bikeModel"
                  value={formData.bikeModel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                  placeholder="e.g., HAQUENICH Model X"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Issue Description</label>
                <textarea
                  name="issueDescription"
                  value={formData.issueDescription}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all resize-none"
                  placeholder="Describe the issues you're experiencing with your bike..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={getMinDate()}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Preferred Time *</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                  >
                    <option value="">Select time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {bookingStatus === 'error' && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-red-400">{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              disabled={bookingStatus === 'loading' || !formData.serviceType}
              className="px-8 py-4 bg-gradient-to-r from-green-500 via-lime-500 to-yellow-500 text-white font-semibold rounded-lg 
                       hover:from-green-600 hover:via-lime-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-green-500/30"
            >
              {bookingStatus === 'loading' ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing Booking...
                </div>
              ) : (
                'Book Service'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBooking;
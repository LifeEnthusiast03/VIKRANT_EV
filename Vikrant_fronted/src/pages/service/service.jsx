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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h2>
              <p className="text-gray-300">Your service request has been successfully submitted.</p>
            </div>
            
            {estimatedTime && (
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-blue-400 mr-2" />
                  <span className="text-lg font-semibold text-blue-400">Estimated Service Time</span>
                </div>
                <p className="text-2xl font-bold text-white">{estimatedTime}</p>
              </div>
            )}
            
            <div className="text-gray-300 space-y-2">
              <p>We'll contact you within 24 hours to confirm your appointment.</p>
              <p>A confirmation email has been sent to <span className="text-blue-400">{formData.email}</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Wrench className="w-12 h-12 text-blue-500 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              Service Booking
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Book a professional service for your electric bike. Our expert technicians will get you back on the road quickly.
          </p>
        </div>

        {/* Service Types Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {serviceTypes.map((service) => (
            <div
              key={service.value}
              onClick={() => setFormData(prev => ({ ...prev, serviceType: service.value }))}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                formData.serviceType === service.value
                  ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 hover:border-gray-600'
              }`}
            >
              <h3 className="text-white font-semibold mb-2">{service.label}</h3>
              <p className="text-gray-400 text-sm">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-400" />
                Personal Information
              </h3>
              
              <div>
                <label className="block text-gray-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
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
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
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
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
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
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  placeholder="Enter your full address"
                />
              </div>
            </div>

            {/* Service Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Wrench className="w-5 h-5 mr-2 text-blue-400" />
                Service Details
              </h3>

              <div>
                <label className="block text-gray-300 mb-2">Bike Model *</label>
                <input
                  type="text"
                  name="bikeModel"
                  value={formData.bikeModel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
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
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors resize-none"
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
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Preferred Time *</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
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
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg 
                       hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-blue-500/20"
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
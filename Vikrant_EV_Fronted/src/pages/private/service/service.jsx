import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Home,
  Building,
  Zap,
  AlertTriangle,
  Clock3,
  Settings,
  Battery,
  Disc,
  Circle
} from 'lucide-react';

// Service API functions
const serviceAPI = {
  // Get user info
  getUserInfo: async () => {
    try {
      const response = await fetch('/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust based on your auth setup
        }
      });
      if (!response.ok) throw new Error('Failed to fetch user info');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  },

  // Book service
  bookService: async (serviceData) => {
    try {
      const response = await fetch('/service/book-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(serviceData)
      });
      if (!response.ok) throw new Error('Failed to book service');
      return await response.json();
    } catch (error) {
      console.error('Error booking service:', error);
      throw error;
    }
  },

  // Get all services
  getAllServices: async (filters = {}) => {
    try {
      const response = await fetch('/service/get-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(filters)
      });
      if (!response.ok) throw new Error('Failed to fetch services');
      return await response.json();
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Get service status
  getServiceStatus: async (serviceId) => {
    try {
      const response = await fetch('/service/get-service-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ serviceId })
      });
      if (!response.ok) throw new Error('Failed to fetch service status');
      return await response.json();
    } catch (error) {
      console.error('Error fetching service status:', error);
      throw error;
    }
  }
};

const ServiceBooking = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    customerPhone: '',
    bikeModel: '',
    serialNumber: '',
    serviceType: '',
    serviceMode: '',
    serviceDescription: '',
    urgency: '',
    preferredDate: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  const [bookingStatus, setBookingStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState(null);

  // Service configuration
  const serviceTypes = [
    { 
      value: 'bike_maintenance', 
      label: 'Bike Maintenance', 
      description: 'General maintenance and tune-up',
      icon: Settings,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      value: 'battery_service', 
      label: 'Battery Service', 
      description: 'Battery diagnosis and replacement',
      icon: Battery,
      color: 'from-green-500 to-green-600'
    },
    { 
      value: 'motor_repair', 
      label: 'Motor Repair', 
      description: 'Motor diagnosis and repair',
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600'
    },
    { 
      value: 'brake_service', 
      label: 'Brake Service', 
      description: 'Brake adjustment and repair',
      icon: Disc,
      color: 'from-red-500 to-red-600'
    },
    { 
      value: 'tire_replacement', 
      label: 'Tire Replacement', 
      description: 'Tire replacement and repair',
      icon: Circle,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      value: 'electrical_check', 
      label: 'Electrical Check', 
      description: 'Electrical system diagnosis',
      icon: Zap,
      color: 'from-orange-500 to-orange-600'
    },
    { 
      value: 'full_service', 
      label: 'Full Service', 
      description: 'Complete bike inspection',
      icon: Wrench,
      color: 'from-indigo-500 to-indigo-600'
    },
    { 
      value: 'custom_repair', 
      label: 'Custom Repair', 
      description: 'Custom repair based on description',
      icon: Settings,
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const bikeModels = [
    'HAQUENICH Model X',
    'HAQUENICH Model Y',
    'HAQUENICH Model Z',
    'HAQUENICH Pro',
    'HAQUENICH Elite',
    'HAQUENICH Sport',
    'Other'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low', description: 'Can wait 1-2 weeks', color: 'text-green-400', bgColor: 'from-green-500/20 to-green-600/20' },
    { value: 'medium', label: 'Medium', description: 'Within a week', color: 'text-yellow-400', bgColor: 'from-yellow-500/20 to-yellow-600/20' },
    { value: 'high', label: 'High', description: 'Within 2-3 days', color: 'text-orange-400', bgColor: 'from-orange-500/20 to-orange-600/20' },
    { value: 'urgent', label: 'Urgent', description: 'Same day service', color: 'text-red-400', bgColor: 'from-red-500/20 to-red-600/20' }
  ];

  const serviceModes = [
    {
      value: 'home_service',
      label: 'Home Service',
      description: 'We come to your location',
      icon: Home,
      color: 'from-blue-500/20 to-blue-600/20'
    },
    {
      value: 'showroom_service',
      label: 'Showroom Service',
      description: 'Bring bike to our service center',
      icon: Building,
      color: 'from-purple-500/20 to-purple-600/20'
    }
  ];

  // Load user info and restore form data on component mount
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const response = await serviceAPI.getUserInfo();
        if (response.success) {
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error('Failed to load user info:', error);
      }
    };

    // Restore form data from localStorage
    const savedFormData = localStorage.getItem('serviceBookingFormData');
    const savedShowBookingForm = localStorage.getItem('serviceBookingShowForm');
    
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        setSelectedDate(parsedData.preferredDate);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }

    if (savedShowBookingForm === 'true') {
      setShowBookingForm(true);
    }

    loadUserInfo();
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (showBookingForm) {
      localStorage.setItem('serviceBookingFormData', JSON.stringify(formData));
      localStorage.setItem('serviceBookingShowForm', 'true');
    }
  }, [formData, showBookingForm]);

  // Clear saved data when booking is successful
  useEffect(() => {
    if (bookingStatus === 'success') {
      localStorage.removeItem('serviceBookingFormData');
      localStorage.removeItem('serviceBookingShowForm');
    }
  }, [bookingStatus]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectableFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancelBooking = () => {
    // Clear all form data
    setFormData({
      customerPhone: '',
      bikeModel: '',
      serialNumber: '',
      serviceType: '',
      serviceMode: '',
      serviceDescription: '',
      urgency: '',
      preferredDate: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      }
    });
    
    // Clear selected date
    setSelectedDate('');
    
    // Clear any error messages
    setErrorMessage('');
    
    // Reset booking status
    setBookingStatus('idle');
    
    // Clear localStorage
    localStorage.removeItem('serviceBookingFormData');
    localStorage.removeItem('serviceBookingShowForm');
    
    // Return to welcome screen
    setShowBookingForm(false);
  };

  const validateForm = () => {
    const requiredFields = ['customerPhone', 'bikeModel', 'serviceType', 'serviceMode', 'serviceDescription', 'preferredDate'];
    
    for (let field of requiredFields) {
      if (!formData[field]) {
        return `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
      }
    }

    if (formData.serviceMode === 'home_service') {
      if (!formData.address.street || !formData.address.city || !formData.address.state || !formData.address.zipCode) {
        return 'Complete address is required for home service';
      }
    }

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setBookingStatus('error');
      return;
    }

    if (!userInfo) {
      setErrorMessage('User information not loaded. Please refresh the page.');
      setBookingStatus('error');
      return;
    }

    setBookingStatus('loading');
    setErrorMessage('');

    try {
      const serviceData = {
        customerName: userInfo.name,
        customerEmail: userInfo.email,
        customerPhone: formData.customerPhone,
        bikeModel: formData.bikeModel,
        serialNumber: formData.serialNumber,
        serviceType: formData.serviceType,
        serviceMode: formData.serviceMode,
        serviceDescription: formData.serviceDescription,
        urgency: formData.urgency || 'medium',
        preferredDate: formData.preferredDate,
        ...(formData.serviceMode === 'home_service' && { address: formData.address })
      };

      const response = await serviceAPI.bookService(serviceData);
      
      if (response.success) {
        setSuccessData(response.data);
        setBookingStatus('success');
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setFormData({
            customerPhone: '',
            bikeModel: '',
            serialNumber: '',
            serviceType: '',
            serviceMode: '',
            serviceDescription: '',
            urgency: '',
            preferredDate: '',
            address: {
              street: '',
              city: '',
              state: '',
              zipCode: ''
            }
          });
          setSelectedDate('');
          setBookingStatus('idle');
          setSuccessData(null);
          setShowBookingForm(false); // Return to welcome screen
        }, 5000);
      } else {
        throw new Error(response.message || 'Failed to book service');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Failed to submit booking. Please try again.');
      setBookingStatus('error');
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  // Calendar utility functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleDateSelect = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (!isDateDisabled(selectedDate)) {
      const formattedDate = formatDateForInput(selectedDate);
      setSelectedDate(formattedDate);
      setFormData(prev => ({
        ...prev,
        preferredDate: formattedDate
      }));
      setShowCalendar(false);
    }
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isDisabled = isDateDisabled(date);
      const isSelected = selectedDate === formatDateForInput(date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          disabled={isDisabled}
          className={`h-10 w-10 rounded-lg transition-all duration-200 ${
            isSelected
              ? 'bg-green-500 text-white font-semibold'
              : isDisabled
              ? 'text-gray-600 cursor-not-allowed'
              : 'text-white hover:bg-green-500/20 hover:text-green-400'
          }`}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 max-w-md w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Select Date</h3>
            <button
              onClick={() => setShowCalendar(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              ‹
            </button>
            <h4 className="text-lg font-semibold text-white">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h4>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="h-8 flex items-center justify-center text-sm text-gray-400 font-medium">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days}
          </div>

          <div className="mt-4 text-sm text-gray-400 text-center">
            Select your preferred service date
          </div>
        </div>
      </div>
    );
  };

  // Welcome/Landing screen - shown when user first visits
  if (!showBookingForm && bookingStatus !== 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 px-4">
        {/* Background Effects */}
        <div className="fixed inset-0 opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/15 via-lime-400/10 to-yellow-400/8" />
        </div>
        
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
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 via-lime-500/20 to-yellow-500/20 rounded-full border border-green-500/40 backdrop-blur-sm mb-8">
              <Wrench className="w-6 h-6 text-green-400 mr-3" />
              <span className="text-sm font-bold bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
                Professional E-Bike Service
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent">
                Service Center
              </span>
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              Get your electric bike serviced by our expert technicians. From basic maintenance to complex repairs, 
              we've got you covered with professional service at your convenience.
            </p>
            
            {userInfo && (
              <div className="mb-8 inline-flex items-center px-6 py-3 bg-green-500/20 rounded-xl border border-green-500/30">
                <User className="w-5 h-5 text-green-400 mr-3" />
                <span className="text-green-400 text-lg">Welcome back, {userInfo.name}!</span>
              </div>
            )}
          </div>

          {/* Service Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Home Service</h3>
              <p className="text-gray-400">We come to your location for convenient at-home service</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Showroom Service</h3>
              <p className="text-gray-400">Visit our service center for comprehensive maintenance</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quick Turnaround</h3>
              <p className="text-gray-400">Fast and efficient service to get you back on the road</p>
            </div>
          </div>

          {/* Main CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-lime-400/5 to-yellow-400/5 opacity-50" />
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Service Your E-Bike?</h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Book a professional service appointment today. Our certified technicians will ensure your 
                  electric bike is running at peak performance.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="px-10 py-4 bg-gradient-to-r from-green-500 via-lime-500 to-yellow-500 text-white font-bold text-lg rounded-xl 
                             hover:from-green-600 hover:via-lime-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 
                             shadow-lg shadow-green-500/30 flex items-center"
                  >
                    <Calendar className="w-6 h-6 mr-3" />
                    Book Service Now
                  </button>
                  
                  <button
                    onClick={() => {/* Add functionality to view existing bookings */}}
                    className="px-8 py-4 bg-gray-700/50 text-white font-semibold rounded-xl border border-gray-600/50
                             hover:bg-gray-600/50 hover:border-gray-500/50 transition-all duration-300 flex items-center"
                  >
                    <Clock className="w-5 h-5 mr-2" />
                    View My Bookings
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Services Overview */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceTypes.slice(0, 4).map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={service.value} className="bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-4 text-center">
                  <IconComponent className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-1">{service.label}</h4>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Success screen
  if (bookingStatus === 'success' && successData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 px-4">
        <div className="fixed inset-0 opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/15 via-lime-400/10 to-yellow-400/8" />
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-gray-300 mb-6">Your service request has been successfully submitted.</p>
            
            <div className="bg-gradient-to-r from-green-500/20 to-lime-500/20 border border-green-500/30 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-gray-400">Service ID:</span>
                  <p className="text-white font-semibold">{successData.serviceId}</p>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <p className="text-green-400 font-semibold capitalize">{successData.status}</p>
                </div>
                <div>
                  <span className="text-gray-400">Service Type:</span>
                  <p className="text-white font-semibold">{serviceTypes.find(s => s.value === successData.serviceType)?.label}</p>
                </div>
                <div>
                  <span className="text-gray-400">Service Mode:</span>
                  <p className="text-white font-semibold">{successData.serviceMode.replace('_', ' ')}</p>
                </div>
                <div>
                  <span className="text-gray-400">Preferred Date:</span>
                  <p className="text-white font-semibold">{new Date(successData.preferredDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-400">Estimated Cost:</span>
                  <p className="text-white font-semibold">{successData.estimatedCost}</p>
                </div>
              </div>
            </div>
            
            <div className="text-gray-300 space-y-2">
              <p>We'll contact you within 24 hours to confirm your appointment.</p>
              <p>A confirmation email has been sent to <span className="text-green-400">{userInfo?.email}</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/15 via-lime-400/10 to-yellow-400/8" />
      </div>
      
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

      <div className="relative z-10 max-w-6xl mx-auto">
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
          
          {userInfo && (
            <div className="mt-6 inline-flex items-center px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
              <User className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-green-400">Welcome, {userInfo.name}</span>
            </div>
          )}
        </div>

        {/* Service Type Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Settings className="w-6 h-6 text-green-400 mr-2" />
            Select Service Type
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {serviceTypes.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.value}
                  onClick={() => handleSelectableFieldChange('serviceType', service.value)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                    formData.serviceType === service.value
                      ? 'bg-gradient-to-br from-green-500/20 to-lime-500/20 border-green-500 shadow-lg shadow-green-500/20'
                      : 'bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl border-gray-700 hover:bg-gray-800/50 hover:border-green-500/30'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <IconComponent className={`w-8 h-8 mb-3 ${
                      formData.serviceType === service.value ? 'text-green-400' : 'text-gray-400'
                    }`} />
                    <h3 className={`font-semibold mb-2 ${
                      formData.serviceType === service.value ? 'text-green-400' : 'text-white'
                    }`}>
                      {service.label}
                    </h3>
                    <p className="text-gray-400 text-sm">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bike Model Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Zap className="w-6 h-6 text-lime-400 mr-2" />
            Select Bike Model
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {bikeModels.map((model) => (
              <div
                key={model}
                onClick={() => handleSelectableFieldChange('bikeModel', model)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  formData.bikeModel === model
                    ? 'bg-gradient-to-br from-lime-500/20 to-yellow-500/20 border-lime-500 shadow-lg shadow-lime-500/20'
                    : 'bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl border-gray-700 hover:bg-gray-800/50 hover:border-lime-500/30'
                }`}
              >
                <h3 className={`font-semibold text-center ${
                  formData.bikeModel === model ? 'text-lime-400' : 'text-white'
                }`}>
                  {model}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Service Mode Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <MapPin className="w-6 h-6 text-blue-400 mr-2" />
            Select Service Mode
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {serviceModes.map((mode) => {
              const IconComponent = mode.icon;
              return (
                <div
                  key={mode.value}
                  onClick={() => handleSelectableFieldChange('serviceMode', mode.value)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    formData.serviceMode === mode.value
                      ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl border-gray-700 hover:bg-gray-800/50 hover:border-blue-500/30'
                  }`}
                >
                  <div className="flex items-center">
                    <IconComponent className={`w-8 h-8 mr-4 ${
                      formData.serviceMode === mode.value ? 'text-blue-400' : 'text-gray-400'
                    }`} />
                    <div>
                      <h3 className={`font-semibold mb-1 ${
                        formData.serviceMode === mode.value ? 'text-blue-400' : 'text-white'
                      }`}>
                        {mode.label}
                      </h3>
                      <p className="text-gray-400 text-sm">{mode.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Urgency Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 text-orange-400 mr-2" />
            Select Urgency Level
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {urgencyLevels.map((level) => (
              <div
                key={level.value}
                onClick={() => handleSelectableFieldChange('urgency', level.value)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  formData.urgency === level.value
                    ? `bg-gradient-to-br ${level.bgColor} border-current shadow-lg`
                    : 'bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl border-gray-700 hover:bg-gray-800/50'
                }`}
              >
                <div className="text-center">
                  <h3 className={`font-semibold mb-2 ${
                    formData.urgency === level.value ? level.color : 'text-white'
                  }`}>
                    {level.label}
                  </h3>
                  <p className="text-gray-400 text-sm">{level.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Details */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-green-400" />
                Contact Information
              </h3>
              
              <div>
                <label className="block text-gray-300 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Serial Number (Optional)</label>
                <input
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                  placeholder="Enter bike serial number"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Preferred Date *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedDate ? new Date(selectedDate).toLocaleDateString() : ''}
                    readOnly
                    onClick={() => setShowCalendar(true)}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all cursor-pointer"
                    placeholder="Click to select date"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-lime-400 to-yellow-400 bg-clip-text text-transparent mb-4 flex items-center">
                <Wrench className="w-5 h-5 mr-2 text-lime-400" />
                Service Details
              </h3>

              <div>
                <label className="block text-gray-300 mb-2">Service Description *</label>
                <textarea
                  name="serviceDescription"
                  value={formData.serviceDescription}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all resize-none"
                  placeholder="Describe the issues you're experiencing with your bike..."
                />
              </div>
            </div>
          </div>

          {/* Address Section (only for home service) */}
          {formData.serviceMode === 'home_service' && (
            <div className="mt-8 pt-8 border-t border-gray-700/50">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 flex items-center">
                <Home className="w-5 h-5 mr-2 text-blue-400" />
                Service Address
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Street Address *</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                    placeholder="Enter street address"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">City *</label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">State *</label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                    placeholder="Enter state"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Zip Code *</label>
                  <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                    placeholder="Enter zip code"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {bookingStatus === 'error' && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-red-400">{errorMessage}</span>
            </div>
          )}

          {/* Submit and Cancel Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleSubmit}
              disabled={bookingStatus === 'loading' || !formData.serviceType || !formData.bikeModel || !formData.serviceMode}
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
            
            <button
              onClick={handleCancelBooking}
              disabled={bookingStatus === 'loading'}
              className="px-6 py-4 bg-gray-700/50 border border-gray-600/50 text-gray-300 font-semibold rounded-lg 
                       hover:bg-gray-600/50 hover:border-gray-500/50 hover:text-white transition-all duration-300 
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel & Start Over
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBooking;
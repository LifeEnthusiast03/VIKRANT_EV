import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Eye, Trash2, User, Mail, Phone, Calendar, MessageSquare, Settings, Bell, Package, Activity, Users, FileText, Wrench, Clock, MapPin, BarChart3, TrendingUp, Plus, Database } from 'lucide-react';

// Utility function for className merging (cn)
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Mock data for contact requests
const mockContactRequests = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1234567890",
    subject: "Battery Issue",
    message: "My bike battery is not charging properly. Can you help?",
    date: "2025-01-20",
    status: "pending",
    priority: "high"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.w@email.com",
    phone: "+1987654321",
    subject: "Service Request",
    message: "Need maintenance service for my electric bike.",
    date: "2025-01-19",
    status: "resolved",
    priority: "medium"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.j@email.com",
    phone: "+1122334455",
    subject: "Warranty Claim",
    message: "I want to claim warranty for my bike's motor.",
    date: "2025-01-18",
    status: "pending",
    priority: "high"
  }
];

// Mock data for service bookings
const mockServiceBookings = [
  {
    id: 1,
    customerName: "Alice Brown",
    email: "alice.b@email.com",
    phone: "+1555666777",
    bikeModel: "Thunder X1",
    serviceType: "Full Service",
    preferredDate: "2025-01-25",
    preferredTime: "10:00 AM",
    status: "confirmed",
    notes: "Regular maintenance check"
  },
  {
    id: 2,
    customerName: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+1444333222",
    bikeModel: "Lightning Pro",
    serviceType: "Battery Check",
    preferredDate: "2025-01-24",
    preferredTime: "2:00 PM",
    status: "pending",
    notes: "Battery not holding charge"
  }
];

// Mock bike data
const mockBikes = [
  {
    id: 1,
    model: "Thunder X1",
    serialNumber: "VKT-TX1-2025-001",
    batteryCapacity: "72V 40Ah",
    range: "120 km",
    topSpeed: "80 km/h",
    motorPower: "3000W",
    status: "active",
    registeredDate: "2025-01-15",
    lastService: "2025-01-10",
    nextService: "2025-04-10",
    owner: {
      name: "Rajesh Kumar",
      email: "rajesh.k@email.com",
      phone: "+91-9876543210",
      address: "123 MG Road, Bangalore"
    },
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: "Bangalore, Karnataka"
    }
  },
  {
    id: 2,
    model: "Lightning Pro",
    serialNumber: "VKT-LP-2025-002",
    batteryCapacity: "60V 32Ah",
    range: "100 km",
    topSpeed: "70 km/h",
    motorPower: "2500W",
    status: "maintenance",
    registeredDate: "2025-01-12",
    lastService: "2025-01-20",
    nextService: "2025-04-20",
    owner: {
      name: "Priya Sharma",
      email: "priya.s@email.com",
      phone: "+91-9123456789",
      address: "456 Park Street, Kolkata"
    },
    location: {
      lat: 22.5726,
      lng: 88.3639,
      address: "Kolkata, West Bengal"
    }
  },
  {
    id: 3,
    model: "Eco Rider",
    serialNumber: "VKT-ER-2025-003",
    batteryCapacity: "48V 24Ah",
    range: "80 km",
    topSpeed: "60 km/h",
    motorPower: "2000W",
    status: "active",
    registeredDate: "2025-01-08",
    lastService: "2025-01-05",
    nextService: "2025-04-05",
    owner: {
      name: "Amit Patel",
      email: "amit.p@email.com",
      phone: "+91-9876512345",
      address: "789 Ring Road, Ahmedabad"
    },
    location: {
      lat: 23.0225,
      lng: 72.5714,
      address: "Ahmedabad, Gujarat"
    }
  }
];

// Mock analytics data
const mockAnalytics = {
  totalRequests: 145,
  pendingRequests: 23,
  resolvedRequests: 98,
  totalBookings: 67,
  confirmedBookings: 45,
  completedBookings: 18,
  monthlyGrowth: 12.5,
  customerSatisfaction: 94.2,
  totalBikes: 156,
  activeBikes: 134,
  bikesInMaintenance: 15,
  bikesSold: 7
};

const BikeRegistrationComponent = () => {
  const [formData, setFormData] = useState({
    model: '',
    serialNumber: '',
    batteryCapacity: '',
    range: '',
    topSpeed: '',
    motorPower: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerAddress: '',
    registrationDate: new Date().toISOString().split('T')[0]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          model: '',
          serialNumber: '',
          batteryCapacity: '',
          range: '',
          topSpeed: '',
          motorPower: '',
          ownerName: '',
          ownerEmail: '',
          ownerPhone: '',
          ownerAddress: '',
          registrationDate: new Date().toISOString().split('T')[0]
        });
      }, 2000);
    }, 1500);
  };

  const bikeModels = [
    'Thunder X1',
    'Lightning Pro',
    'Eco Rider',
    'Urban Cruiser',
    'Speed Demon',
    'City Commuter'
  ];

  return (
    <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl shadow-lg shadow-green-900/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-60" />
      
      <div className="relative z-10">
        <div className="p-6 border-b border-green-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 border border-green-500/30">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">BIKE REGISTRATION</h2>
              <p className="text-green-400 text-sm">REGISTER NEW ELECTRIC VEHICLES</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {submitSuccess ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/50">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-200 mb-2">Bike Registered Successfully!</h3>
              <p className="text-green-400">The bike has been added to the system.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Bike Information */}
              <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-green-200 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  BIKE INFORMATION
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">Bike Model</label>
                    <select
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    >
                      <option value="">Select Model</option>
                      {bikeModels.map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">Serial Number</label>
                    <input
                      type="text"
                      name="serialNumber"
                      value={formData.serialNumber}
                      onChange={handleInputChange}
                      placeholder="VKT-XXX-2025-XXX"
                      required
                      className="w-full px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">Battery Capacity</label>
                    <input
                      type="text"
                      name="batteryCapacity"
                      value={formData.batteryCapacity}
                      onChange={handleInputChange}
                      placeholder="e.g., 72V 40Ah"
                      required
                      className="w-full px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">Range (km)</label>
                    <input
                      type="text"
                      name="range"
                      value={formData.range}
                      onChange={handleInputChange}
                      placeholder="e.g., 120 km"
                      required
                      className="w-full px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">Top Speed (km/h)</label>
                    <input
                      type="text"
                      name="topSpeed"
                      value={formData.topSpeed}
                      onChange={handleInputChange}
                      placeholder="e.g., 80 km/h"
                      required
                      className="w-full px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">Motor Power</label>
                    <input
                      type="text"
                      name="motorPower"
                      value={formData.motorPower}
                      onChange={handleInputChange}
                      placeholder="e.g., 3000W"
                      required
                      className="w-full px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-green-200 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  OWNER INFORMATION
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">Owner Name</label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      required
                      className="w-full px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="ownerEmail"
                      value={formData.ownerEmail}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      required
                      className="w-full px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleInputChange}
                      placeholder="+91-XXXXXXXXXX"
                      required
                      className="w-full px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">Registration Date</label>
                    <input
                      type="date"
                      name="registrationDate"
                      value={formData.registrationDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-green-300 text-sm font-medium mb-2">Address</label>
                    <textarea
                      name="ownerAddress"
                      value={formData.ownerAddress}
                      onChange={handleInputChange}
                      placeholder="Complete Address"
                      required
                      rows={3}
                      className="w-full px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-green-600/30 border border-green-500/50 ${
                    isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:from-green-700 hover:to-emerald-700 hover:shadow-green-600/40'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      REGISTERING...
                    </span>
                  ) : (
                    'REGISTER BIKE'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const BikeDashboardComponent = () => {
  const [bikes, setBikes] = useState(mockBikes);
  const [selectedBike, setSelectedBike] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBikes = bikes.filter(bike => {
    const matchesSearch = bike.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bike.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bike.owner.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bike.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateBikeStatus = (id, newStatus) => {
    setBikes(bikes.map(bike => 
      bike.id === id ? { ...bike, status: newStatus } : bike
    ));
  };

  const deleteBike = (id) => {
    setBikes(bikes.filter(bike => bike.id !== id));
    setSelectedBike(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-950/60 border border-green-800/50';
      case 'maintenance': return 'text-orange-400 bg-orange-950/60 border border-orange-800/50';
      case 'inactive': return 'text-red-400 bg-red-950/60 border border-red-800/50';
      case 'sold': return 'text-blue-400 bg-blue-950/60 border border-blue-800/50';
      default: return 'text-gray-400 bg-gray-950/60 border border-gray-800/50';
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl shadow-lg shadow-green-900/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-60" />
      
      <div className="relative z-10">
        <div className="p-6 border-b border-green-800/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 border border-green-500/30">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">BIKE DASHBOARD</h2>
                <p className="text-green-400 text-sm">REGISTERED VEHICLES MANAGEMENT</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search bikes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="p-6 border-b border-green-800/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-200">{mockAnalytics.totalBikes}</div>
                <div className="text-sm text-green-400">Total Bikes</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-200">{mockAnalytics.activeBikes}</div>
                <div className="text-sm text-green-400">Active</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-200">{mockAnalytics.bikesInMaintenance}</div>
                <div className="text-sm text-green-400">Maintenance</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-200">{mockAnalytics.bikesSold}</div>
                <div className="text-sm text-green-400">Sold</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Bikes List */}
          <div className="space-y-4">
            {filteredBikes.map((bike) => (
              <div
                key={bike.id}
                className={`p-4 bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 ${
                  selectedBike?.id === bike.id 
                    ? 'border-green-500/70 bg-gradient-to-br from-green-600/20 to-emerald-600/20' 
                    : 'border-green-800/30 hover:border-green-600/50'
                }`}
                onClick={() => setSelectedBike(bike)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-green-200">{bike.model}</h3>
                    <p className="text-sm text-green-400">{bike.serialNumber}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bike.status)}`}>
                    {bike.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-green-300 mb-2">Owner: {bike.owner.name}</p>
                <div className="flex justify-between text-xs text-green-500">
                  <span>Range: {bike.range}</span>
                  <span>Registered: {bike.registeredDate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bike Details */}
          <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-60" />
            <div className="relative z-10">
              {selectedBike ? (
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">BIKE DETAILS</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateBikeStatus(selectedBike.id, 'active')}
                        className="p-2 text-green-400 hover:bg-green-950/60 border border-green-800/50 rounded-lg transition-all hover:border-green-600/60"
                        title="Mark as Active"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteBike(selectedBike.id)}
                        className="p-2 text-red-400 hover:bg-red-950/60 border border-red-800/50 rounded-lg transition-all hover:border-red-600/60"
                        title="Delete Bike"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Bike Information */}
                    <div className="bg-green-950/30 rounded-lg p-4 border border-green-800/30">
                      <h4 className="font-medium text-green-200 mb-3 flex items-center">
                        <Package className="w-4 h-4 mr-2" />
                        VEHICLE SPECS
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-green-400">Model:</span>
                          <span className="text-green-200 ml-2">{selectedBike.model}</span>
                        </div>
                        <div>
                          <span className="text-green-400">Serial:</span>
                          <span className="text-green-200 ml-2">{selectedBike.serialNumber}</span>
                        </div>
                        <div>
                          <span className="text-green-400">Battery:</span>
                          <span className="text-green-200 ml-2">{selectedBike.batteryCapacity}</span>
                        </div>
                        <div>
                          <span className="text-green-400">Range:</span>
                          <span className="text-green-200 ml-2">{selectedBike.range}</span>
                        </div>
                        <div>
                          <span className="text-green-400">Top Speed:</span>
                          <span className="text-green-200 ml-2">{selectedBike.topSpeed}</span>
                        </div>
                        <div>
                          <span className="text-green-400">Motor:</span>
                          <span className="text-green-200 ml-2">{selectedBike.motorPower}</span>
                        </div>
                      </div>
                    </div>

                    {/* Owner Information */}
                    <div className="bg-green-950/30 rounded-lg p-4 border border-green-800/30">
                      <h4 className="font-medium text-green-200 mb-3 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        OWNER DETAILS
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-green-400 mr-2" />
                          <span className="text-green-200">{selectedBike.owner.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 text-green-400 mr-2" />
                          <span className="text-green-200">{selectedBike.owner.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-green-400 mr-2" />
                          <span className="text-green-200">{selectedBike.owner.phone}</span>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                          <span className="text-green-200">{selectedBike.owner.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Service Information */}
                    <div className="bg-green-950/30 rounded-lg p-4 border border-green-800/30">
                      <h4 className="font-medium text-green-200 mb-3 flex items-center">
                        <Wrench className="w-4 h-4 mr-2" />
                        SERVICE HISTORY
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-green-400">Registered:</span>
                          <span className="text-green-200">{selectedBike.registeredDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400">Last Service:</span>
                          <span className="text-green-200">{selectedBike.lastService}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400">Next Service:</span>
                          <span className="text-green-200">{selectedBike.nextService}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => updateBikeStatus(selectedBike.id, 'maintenance')}
                      className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all shadow-lg shadow-orange-600/30 border border-orange-500/50"
                    >
                      MAINTENANCE
                    </button>
                    <button
                      onClick={() => updateBikeStatus(selectedBike.id, 'active')}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-600/30 border border-green-500/50"
                    >
                      ACTIVATE
                    </button>
                    <button
                      onClick={() => updateBikeStatus(selectedBike.id, 'sold')}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-600/30 border border-blue-500/50"
                    >
                      MARK SOLD
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-green-500">
                  <Package className="w-12 h-12 mx-auto mb-4 text-green-400 opacity-50" />
                  <p>Select a bike to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Advanced Tabs Component with 3D animations
const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
  activeTab,
  onTabChange,
}) => {
  const [active, setActive] = useState(
    activeTab ? propTabs.find(tab => tab.value === activeTab) || propTabs[0] : propTabs[0]
  );
  const [tabs, setTabs] = useState(propTabs);

  // Update active tab when external activeTab prop changes
  React.useEffect(() => {
    if (activeTab) {
      const targetTab = propTabs.find(tab => tab.value === activeTab);
      if (targetTab && targetTab.value !== active.value) {
        const idx = propTabs.findIndex(tab => tab.value === activeTab);
        moveSelectedTabToTop(idx);
      }
    }
  }, [activeTab, propTabs, active.value]);

  const moveSelectedTabToTop = (idx) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
    if (onTabChange) {
      onTabChange(newTabs[0].value);
    }
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full mb-8",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.value}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              "relative px-6 py-3 rounded-full mr-2 transition-all duration-300 flex items-center space-x-2 whitespace-nowrap",
              tabClassName
            )}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-r from-green-600/30 to-emerald-600/30 rounded-full border border-green-400/50 shadow-lg shadow-green-500/20",
                  activeTabClassName
                )}
                style={{
                  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              />
            )}

            <span className="relative block text-green-300 font-medium flex items-center space-x-2">
              {tab.icon}
              <span>{tab.title}</span>
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("", contentClassName)}
      />
    </>
  );
};

const FadeInDiv = ({
  className,
  tabs,
  hovering,
}) => {
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <div
          key={tab.value}
          style={{
            transform: `scale(${1 - idx * 0.05}) translateY(${hovering ? idx * -20 : 0}px)`,
            zIndex: tabs.length - idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
            transition: "all 0.3s ease-in-out"
          }}
          className={cn(
            "w-full transition-all duration-300",
            idx === 0 ? "relative" : "absolute top-0 left-0",
            className
          )}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

const ContactRequestsComponent = () => {
  const [requests, setRequests] = useState(mockContactRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateRequestStatus = (id, newStatus) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const deleteRequest = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    setSelectedRequest(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-950/60 border border-red-800/50';
      case 'medium': return 'text-yellow-400 bg-yellow-950/60 border border-yellow-800/50';
      case 'low': return 'text-green-400 bg-green-950/60 border border-green-800/50';
      default: return 'text-gray-400 bg-gray-950/60 border border-gray-800/50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-orange-400 bg-orange-950/60 border border-orange-800/50';
      case 'resolved': return 'text-green-400 bg-green-950/60 border border-green-800/50';
      case 'in-progress': return 'text-blue-400 bg-blue-950/60 border border-blue-800/50';
      default: return 'text-gray-400 bg-gray-950/60 border border-gray-800/50';
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl shadow-lg shadow-green-900/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-60" />
      
      <div className="relative z-10">
        <div className="p-6 border-b border-green-800/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 border border-green-500/30">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">CONTACT REQUESTS</h2>
                <p className="text-green-400 text-sm">CUSTOMER INQUIRIES & SUPPORT</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Requests List */}
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className={`p-4 bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 ${
                  selectedRequest?.id === request.id 
                    ? 'border-green-500/70 bg-gradient-to-br from-green-600/20 to-emerald-600/20' 
                    : 'border-green-800/30 hover:border-green-600/50'
                }`}
                onClick={() => setSelectedRequest(request)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-green-200">{request.name}</h3>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                      {request.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-green-400 mb-2">{request.subject}</p>
                <p className="text-xs text-green-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {request.date}
                </p>
              </div>
            ))}
          </div>

          {/* Request Details */}
          <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-60" />
            <div className="relative z-10">
              {selectedRequest ? (
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">REQUEST DETAILS</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateRequestStatus(selectedRequest.id, 'resolved')}
                        className="p-2 text-green-400 hover:bg-green-950/60 border border-green-800/50 rounded-lg transition-all hover:border-green-600/60"
                        title="Mark as Resolved"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteRequest(selectedRequest.id)}
                        className="p-2 text-red-400 hover:bg-red-950/60 border border-red-800/50 rounded-lg transition-all hover:border-red-600/60"
                        title="Delete Request"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-950/30 rounded-lg border border-green-800/30">
                      <User className="w-5 h-5 text-green-400" />
                      <span className="font-medium text-green-200">{selectedRequest.name}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-950/30 rounded-lg border border-green-800/30">
                      <Mail className="w-5 h-5 text-green-400" />
                      <span className="text-green-300">{selectedRequest.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-950/30 rounded-lg border border-green-800/30">
                      <Phone className="w-5 h-5 text-green-400" />
                      <span className="text-green-300">{selectedRequest.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-950/30 rounded-lg border border-green-800/30">
                      <Calendar className="w-5 h-5 text-green-400" />
                      <span className="text-green-300">{selectedRequest.date}</span>
                    </div>
                    <div className="p-3 bg-green-950/30 rounded-lg border border-green-800/30">
                      <div className="flex items-start space-x-3">
                        <MessageSquare className="w-5 h-5 text-green-400 mt-1" />
                        <div>
                          <p className="font-medium mb-2 text-green-200">{selectedRequest.subject}</p>
                          <p className="text-green-300">{selectedRequest.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <button
                      onClick={() => updateRequestStatus(selectedRequest.id, 'in-progress')}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-600/30 border border-blue-500/50"
                    >
                      IN PROGRESS
                    </button>
                    <button
                      onClick={() => updateRequestStatus(selectedRequest.id, 'resolved')}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-600/30 border border-green-500/50"
                    >
                      RESOLVE
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-green-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-green-400 opacity-50" />
                  <p>Select a request to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceBookingsComponent = () => {
  const [bookings, setBookings] = useState(mockServiceBookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bikeModel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateBookingStatus = (id, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };

  const deleteBooking = (id) => {
    setBookings(bookings.filter(booking => booking.id !== id));
    setSelectedBooking(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-orange-400 bg-orange-950/60 border border-orange-800/50';
      case 'confirmed': return 'text-green-400 bg-green-950/60 border border-green-800/50';
      case 'completed': return 'text-blue-400 bg-blue-950/60 border border-blue-800/50';
      case 'cancelled': return 'text-red-400 bg-red-950/60 border border-red-800/50';
      default: return 'text-gray-400 bg-gray-950/60 border border-gray-800/50';
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl shadow-lg shadow-green-900/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-60" />
      
      <div className="relative z-10">
        <div className="p-6 border-b border-green-800/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 border border-green-500/30">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">SERVICE BOOKINGS</h2>
                <p className="text-green-400 text-sm">MAINTENANCE & REPAIR APPOINTMENTS</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className={`p-4 bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 ${
                  selectedBooking?.id === booking.id 
                    ? 'border-green-500/70 bg-gradient-to-br from-green-600/20 to-emerald-600/20' 
                    : 'border-green-800/30 hover:border-green-600/50'
                }`}
                onClick={() => setSelectedBooking(booking)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-green-200">{booking.customerName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-green-400 mb-2">{booking.bikeModel} - {booking.serviceType}</p>
                <p className="text-xs text-green-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {booking.preferredDate} at {booking.preferredTime}
                </p>
              </div>
            ))}
          </div>

          {/* Booking Details */}
          <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-60" />
            <div className="relative z-10">
              {selectedBooking ? (
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">BOOKING DETAILS</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
                        className="p-2 text-green-400 hover:bg-green-950/60 border border-green-800/50 rounded-lg transition-all hover:border-green-600/60"
                        title="Confirm Booking"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteBooking(selectedBooking.id)}
                        className="p-2 text-red-400 hover:bg-red-950/60 border border-red-800/50 rounded-lg transition-all hover:border-red-600/60"
                        title="Delete Booking"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-950/30 rounded-lg border border-green-800/30">
                      <User className="w-5 h-5 text-green-400" />
                      <span className="font-medium text-green-200">{selectedBooking.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-950/30 rounded-lg border border-green-800/30">
                      <Mail className="w-5 h-5 text-green-400" />
                      <span className="text-green-300">{selectedBooking.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-950/30 rounded-lg border border-green-800/30">
                      <Phone className="w-5 h-5 text-green-400" />
                      <span className="text-green-300">{selectedBooking.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-950/30 rounded-lg border border-green-800/30">
                      <Package className="w-5 h-5 text-green-400" />
                      <span className="text-green-300">{selectedBooking.bikeModel}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-950/30 rounded-lg border border-green-800/30">
                      <Settings className="w-5 h-5 text-green-400" />
                      <span className="text-green-300">{selectedBooking.serviceType}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-950/30 rounded-lg border border-green-800/30">
                      <Calendar className="w-5 h-5 text-green-400" />
                      <span className="text-green-300">{selectedBooking.preferredDate} at {selectedBooking.preferredTime}</span>
                    </div>
                    {selectedBooking.notes && (
                      <div className="p-3 bg-green-950/30 rounded-lg border border-green-800/30">
                        <div className="flex items-start space-x-3">
                          <MessageSquare className="w-5 h-5 text-green-400 mt-1" />
                          <div>
                            <p className="font-medium mb-2 text-green-200">NOTES</p>
                            <p className="text-green-300">{selectedBooking.notes}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-600/30 border border-green-500/50"
                    >
                      CONFIRM
                    </button>
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, 'completed')}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-600/30 border border-blue-500/50"
                    >
                      COMPLETE
                    </button>
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-600/30 border border-red-500/50"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-green-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-green-400 opacity-50" />
                  <p>Select a booking to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalyticsComponent = () => {
  return (
    <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl shadow-lg shadow-green-900/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-60" />
      
      <div className="relative z-10">
        <div className="p-6 border-b border-green-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 border border-green-500/30">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">ANALYTICS & REPORTS</h2>
              <p className="text-green-400 text-sm">BUSINESS INSIGHTS & METRICS</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-60" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">TOTAL</span>
                </div>
                <div className="text-2xl font-bold text-green-200 mb-1">{mockAnalytics.totalRequests}</div>
                <div className="text-sm text-green-400">Contact Requests</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-60" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">PENDING</span>
                </div>
                <div className="text-2xl font-bold text-green-200 mb-1">{mockAnalytics.pendingRequests}</div>
                <div className="text-sm text-green-400">Awaiting Response</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-60" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">BOOKINGS</span>
                </div>
                <div className="text-2xl font-bold text-green-200 mb-1">{mockAnalytics.totalBookings}</div>
                <div className="text-sm text-green-400">Service Appointments</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-60" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">GROWTH</span>
                </div>
                <div className="text-2xl font-bold text-green-200 mb-1">+{mockAnalytics.monthlyGrowth}%</div>
                <div className="text-sm text-green-400">Monthly Growth</div>
              </div>
            </div>
          </div>

          {/* Charts and Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-60" />
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-green-200 mb-4">Request Status Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-300">Resolved</span>
                    </div>
                    <span className="text-green-200 font-medium">{mockAnalytics.resolvedRequests}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-green-300">Pending</span>
                    </div>
                    <span className="text-green-200 font-medium">{mockAnalytics.pendingRequests}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-green-300">In Progress</span>
                    </div>
                    <span className="text-green-200 font-medium">{mockAnalytics.totalRequests - mockAnalytics.resolvedRequests - mockAnalytics.pendingRequests}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-60" />
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-green-200 mb-4">Service Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-green-300">Customer Satisfaction</span>
                    <span className="text-green-200 font-medium">{mockAnalytics.customerSatisfaction}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-300">Confirmed Bookings</span>
                    <span className="text-green-200 font-medium">{mockAnalytics.confirmedBookings}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-300">Completed Services</span>
                    <span className="text-green-200 font-medium">{mockAnalytics.completedBookings}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-300">Monthly Growth</span>
                    <span className="text-green-200 font-medium flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +{mockAnalytics.monthlyGrowth}%
                    </span>
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  
  const tabs = [
    {
      title: "CONTACT REQUESTS",
      value: "contacts",
      icon: <MessageSquare className="w-4 h-4" />,
      content: (
        <div className="w-full overflow-hidden relative h-full">
          <ContactRequestsComponent />
        </div>
      ),
    },
    {
      title: "SERVICE BOOKINGS",
      value: "bookings", 
      icon: <Wrench className="w-4 h-4" />,
      content: (
        <div className="w-full overflow-hidden relative h-full">
          <ServiceBookingsComponent />
        </div>
      ),
    },
    {
      title: "BIKE REGISTRATION",
      value: "registration", 
      icon: <Plus className="w-4 h-4" />,
      content: (
        <div className="w-full overflow-hidden relative h-full">
          <BikeRegistrationComponent />
        </div>
      ),
    },
    {
      title: "BIKE DASHBOARD",
      value: "bikes", 
      icon: <Database className="w-4 h-4" />,
      content: (
        <div className="w-full overflow-hidden relative h-full">
          <BikeDashboardComponent />
        </div>
      ),
    },
    {
      title: "ANALYTICS",
      value: "analytics", 
      icon: <BarChart3 className="w-4 h-4" />,
      content: (
        <div className="w-full overflow-hidden relative h-full">
          <AnalyticsComponent />
        </div>
      ),
    },
  ];

  const handleRegisterBike = () => {
    setActiveTab('registration');
  };

  const handleAccessBikeDashboard = () => {
    setActiveTab('bikes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-gray-950 to-green-900 text-white overflow-hidden">
      {/* Enhanced Dynamic Background */}
      <div className="fixed inset-0 opacity-40 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 80%, 
              rgba(34, 197, 94, 0.25) 0%, 
              rgba(20, 83, 45, 0.2) 30%,
              rgba(5, 46, 22, 0.15) 60%, 
              rgba(0, 0, 0, 0.8) 100%)`
          }}
        />
      </div>
      
      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-15">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-2/3 right-1/5 w-1 h-1 bg-emerald-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-green-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 border border-green-500/30">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">VIKRANT EV ADMIN</h1>
                  <p className="text-green-400 mt-1">BUSINESS OPERATIONS CONTROL</p>
                </div>
              </div>
              
              {/* Navigation Items */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleRegisterBike}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-600/50 rounded-lg text-green-300 hover:text-green-200 hover:border-green-500/70 hover:bg-gradient-to-r hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-300 shadow-lg shadow-green-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">REGISTER BIKE</span>
                </button>
                
                <button
                  onClick={handleAccessBikeDashboard}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-600/50 rounded-lg text-blue-300 hover:text-blue-200 hover:border-blue-500/70 hover:bg-gradient-to-r hover:from-blue-600/30 hover:to-blue-700/30 transition-all duration-300 shadow-lg shadow-blue-600/20"
                >
                  <Database className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">BIKE DASHBOARD</span>
                </button>
                
                <button className="p-2 text-green-400 hover:text-green-300 transition-colors">
                  <Bell className="w-6 h-6" />
                </button>
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="[perspective:1000px] relative flex flex-col max-w-full mx-auto w-full items-start justify-start">
            <Tabs 
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              containerClassName="mb-8"
              activeTabClassName="bg-gradient-to-r from-green-600/40 to-emerald-600/40 border-green-400/60"
              tabClassName="text-green-400 hover:text-green-300"
              contentClassName="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
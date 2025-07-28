import React, { useState } from 'react';
import { Search,AlertCircle,ArrowUpDown, Filter, CheckCircle, XCircle, Eye, Trash2, User, Mail, Phone, Calendar, MessageSquare, Settings, Bell, Package, Activity, Users, FileText, Wrench, Clock, MapPin, BarChart3, TrendingUp, Plus, Database } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock analytics data

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
    message: "My bike battery is not charging properly. Can you help? I've tried different chargers but the issue persists. The battery seems to drain very quickly and doesn't hold charge for more than 30 minutes.",
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
    message: "Need maintenance service for my electric bike. It's been 6 months since the last service and I want to ensure everything is working properly before the summer season.",
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
    message: "I want to claim warranty for my bike's motor. The motor started making unusual noises after 3 months of purchase. I have all the purchase documents ready.",
    date: "2025-01-18",
    status: "pending",
    priority: "high"
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily.chen@email.com",
    phone: "+1555666777",
    subject: "Spare Parts Inquiry",
    message: "Looking for replacement brake pads for my e-bike model XR-2000. Could you please provide availability and pricing information?",
    date: "2025-01-17",
    status: "in-progress",
    priority: "low"
  },
  {
    id: 5,
    name: "David Brown",
    email: "d.brown@email.com",
    phone: "+1888999000",
    subject: "Software Update",
    message: "My bike's display shows an error message about firmware update. Can you guide me through the update process or schedule a service appointment?",
    date: "2025-01-16",
    status: "pending",
    priority: "medium"
  },
  {
    id: 6,
    name: "Lisa Martinez",
    email: "lisa.m@email.com",
    phone: "+1333444555",
    subject: "Charging Issue",
    message: "The charging port seems loose and the charger doesn't connect properly. Sometimes it charges, sometimes it doesn't. This is affecting my daily commute.",
    date: "2025-01-15",
    status: "resolved",
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
    notes: "Regular maintenance check",
    problemType: "maintenance",
    bookingTime: "2025-01-20T09:30:00"
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
    notes: "Battery not holding charge",
    problemType: "electrical",
    bookingTime: "2025-01-22T14:15:00"
  },
  {
    id: 3,
    customerName: "Carol Davis",
    email: "carol.d@email.com",
    phone: "+1333222111",
    bikeModel: "Storm Elite",
    serviceType: "Brake Repair",
    preferredDate: "2025-01-23",
    preferredTime: "11:30 AM",
    status: "completed",
    notes: "Front brake pads worn out",
    problemType: "mechanical",
    bookingTime: "2025-01-18T16:45:00"
  },
  {
    id: 4,
    customerName: "David Wilson",
    email: "david.w@email.com",
    phone: "+1222111000",
    bikeModel: "Volt Max",
    serviceType: "Tire Replacement",
    preferredDate: "2025-01-26",
    preferredTime: "3:30 PM",
    status: "cancelled",
    notes: "Customer changed mind",
    problemType: "mechanical",
    bookingTime: "2025-01-21T11:20:00"
  },
  {
    id: 5,
    customerName: "Eva Martinez",
    email: "eva.m@email.com",
    phone: "+1111000999",
    bikeModel: "Phoenix Rider",
    serviceType: "Motor Check",
    preferredDate: "2025-01-27",
    preferredTime: "9:00 AM",
    status: "pending",
    notes: "Strange noise from motor",
    problemType: "electrical",
    bookingTime: "2025-01-23T08:30:00"
  },
  {
    id: 6,
    customerName: "Frank Johnson",
    email: "frank.j@email.com",
    phone: "+1000999888",
    bikeModel: "Thunder X1",
    serviceType: "Full Service",
    preferredDate: "2025-01-28",
    preferredTime: "1:00 PM",
    status: "confirmed",
    notes: "6-month service due",
    problemType: "maintenance",
    bookingTime: "2025-01-19T13:45:00"
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

// Monthly growth data for the chart
const monthlyGrowthData = [
  { month: 'Jan', growth: 5.2, requests: 89, bookings: 34 },
  { month: 'Feb', growth: 7.8, requests: 96, bookings: 41 },
  { month: 'Mar', growth: 8.5, requests: 104, bookings: 48 },
  { month: 'Apr', growth: 10.2, requests: 115, bookings: 53 },
  { month: 'May', growth: 11.8, requests: 129, bookings: 59 },
  { month: 'Jun', growth: 12.5, requests: 145, bookings: 67 }
];


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
//Contact Requests Component
const ContactRequestsComponent = () => {
  const [requests, setRequests] = useState(mockContactRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredRequests = requests
    .filter(request => {
      const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const updateRequestStatus = (id, newStatus) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const deleteRequest = (id) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-300 bg-red-950/80 border-red-700/60';
      case 'medium': return 'text-yellow-300 bg-yellow-950/80 border-yellow-700/60';
      case 'low': return 'text-green-300 bg-green-950/80 border-green-700/60';
      default: return 'text-gray-300 bg-gray-950/80 border-gray-700/60';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-orange-300 bg-orange-950/80 border-orange-700/60';
      case 'resolved': return 'text-green-300 bg-green-950/80 border-green-700/60';
      case 'in-progress': return 'text-blue-300 bg-blue-950/80 border-blue-700/60';
      default: return 'text-gray-300 bg-gray-950/80 border-gray-700/60';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  // Statistics
  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    resolved: requests.filter(r => r.status === 'resolved').length,
    inProgress: requests.filter(r => r.status === 'in-progress').length,
    highPriority: requests.filter(r => r.priority === 'high').length
  };

  return (
    <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl shadow-lg shadow-green-900/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-60" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="p-6 border-b border-green-800/50">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 border border-green-500/30">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">CONTACT REQUESTS</h1>
                  <p className="text-green-400">CUSTOMER INQUIRIES & SUPPORT DASHBOARD</p>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex space-x-4">
                <div className="text-center p-3 bg-green-950/40 rounded-lg border border-green-800/30">
                  <div className="text-2xl font-bold text-green-300">{stats.total}</div>
                  <div className="text-xs text-green-500">TOTAL</div>
                </div>
                <div className="text-center p-3 bg-orange-950/40 rounded-lg border border-orange-800/30">
                  <div className="text-2xl font-bold text-orange-300">{stats.pending}</div>
                  <div className="text-xs text-orange-500">PENDING</div>
                </div>
                <div className="text-center p-3 bg-red-950/40 rounded-lg border border-red-800/30">
                  <div className="text-2xl font-bold text-red-300">{stats.highPriority}</div>
                  <div className="text-xs text-red-500">HIGH PRIORITY</div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-wrap items-center space-x-4 space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, subject, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
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

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
              >
                <option value="all">All Priority</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
              >
                <option value="date">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="p-6">
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-6 hover:border-green-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
              >
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-3 lg:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-green-400" />
                      <span className="font-bold text-xl text-green-200">{request.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getPriorityIcon(request.priority)}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(request.priority)}`}>
                        {request.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(request.status)}`}>
                        {request.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">{request.date}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-950/30 rounded-lg border border-green-800/30">
                    <Mail className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 font-medium">{request.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-950/30 rounded-lg border border-green-800/30">
                    <Phone className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 font-medium">{request.phone}</span>
                  </div>
                </div>

                {/* Subject and Message */}
                <div className="space-y-4">
                  <div className="p-4 bg-green-950/30 rounded-lg border border-green-800/30">
                    <div className="flex items-center space-x-3 mb-2">
                      <MessageSquare className="w-5 h-5 text-green-400" />
                      <h3 className="font-bold text-lg text-green-200">{request.subject}</h3>
                    </div>
                    <p className="text-green-300 leading-relaxed">{request.message}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-end space-x-3 mt-4 pt-4 border-t border-green-800/30">
                  {request.status === 'pending' && (
                    <button
                      onClick={() => updateRequestStatus(request.id, 'in-progress')}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-600/30 border border-blue-500/50 font-medium"
                    >
                      START PROGRESS
                    </button>
                  )}
                  
                  {request.status !== 'resolved' && (
                    <button
                      onClick={() => updateRequestStatus(request.id, 'resolved')}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-600/30 border border-green-500/50 font-medium flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>RESOLVE</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteRequest(request.id)}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-600/30 border border-red-500/50 font-medium flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>DELETE</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-green-400 opacity-50" />
              <p className="text-green-400 text-lg">No contact requests found matching your filters</p>
              <p className="text-green-500 text-sm mt-2">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

//Service Bookings Component
const ServiceBookingsComponent = () => {
  const [bookings, setBookings] = useState(mockServiceBookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Get unique service types for filter
  const serviceTypes = [...new Set(bookings.map(booking => booking.serviceType))];

  // Calculate summary statistics
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const inProgressBookings = bookings.filter(b => b.status === 'in-progress').length;

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bikeModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesServiceType = serviceTypeFilter === 'all' || booking.serviceType === serviceTypeFilter;
    return matchesSearch && matchesStatus && matchesServiceType;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.preferredDate) - new Date(b.preferredDate);
      case 'time':
        return a.preferredTime.localeCompare(b.preferredTime);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
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
      case 'in-progress': return 'text-purple-400 bg-purple-950/60 border border-purple-800/50';
      default: return 'text-gray-400 bg-gray-950/60 border border-gray-800/50';
    }
  };

  const getSummaryBoxColor = (type) => {
    switch (type) {
      case 'total': return 'from-blue-600 to-blue-700 border-blue-500/50 shadow-blue-600/30';
      case 'pending': return 'from-orange-600 to-orange-700 border-orange-500/50 shadow-orange-600/30';
      case 'confirmed': return 'from-green-600 to-green-700 border-green-500/50 shadow-green-600/30';
      case 'inprogress': return 'from-purple-600 to-purple-700 border-purple-500/50 shadow-purple-600/30';
      default: return 'from-gray-600 to-gray-700 border-gray-500/50 shadow-gray-600/30';
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl shadow-lg shadow-green-900/30 relative overflow-hidden">
      {/* Background Effects */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-60" /> */}

      <div>
        <div className="p-6 border-b border-green-800/50">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 border border-green-500/30">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">SERVICE BOOKINGS</h2>
                <p className="text-green-400 text-sm">CUSTOMER INQUIRIES & SUPPORT DASHBOARD</p>
              </div>
            </div>
            
            {/* Summary Boxes */}
            <div className="flex space-x-3">
              <div className={`px-4 py-3 bg-gradient-to-r ${getSummaryBoxColor('total')} rounded-lg border shadow-lg text-center min-w-[80px]`}>
                <div className="text-2xl font-bold text-white">{totalBookings}</div>
                <div className="text-xs text-white/80 uppercase">Total</div>
              </div>
              <div className={`px-4 py-3 bg-gradient-to-r ${getSummaryBoxColor('pending')} rounded-lg border shadow-lg text-center min-w-[80px]`}>
                <div className="text-2xl font-bold text-white">{pendingBookings}</div>
                <div className="text-xs text-white/80 uppercase">Pending</div>
              </div>
              <div className={`px-4 py-3 bg-gradient-to-r ${getSummaryBoxColor('confirmed')} rounded-lg border shadow-lg text-center min-w-[80px]`}>
                <div className="text-2xl font-bold text-white">{confirmedBookings}</div>
                <div className="text-xs text-white/80 uppercase">Confirmed</div>
              </div>
              <div className={`px-4 py-3 bg-gradient-to-r ${getSummaryBoxColor('inprogress')} rounded-lg border shadow-lg text-center min-w-[80px]`}>
                <div className="text-2xl font-bold text-white">{inProgressBookings}</div>
                <div className="text-xs text-white/80 uppercase">In Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b border-green-800/50">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, subject, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
              />
            </div>
            
            <div className="flex space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <select
                value={serviceTypeFilter}
                onChange={(e) => setServiceTypeFilter(e.target.value)}
                className="px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
              >
                <option value="all">All Types</option>
                {serviceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-green-950/50 border border-green-700/50 rounded-lg text-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
              >
                <option value="date">Sort by Date</option>
                <option value="time">Sort by Time</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Bookings List */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
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
                    {booking.status.toUpperCase().replace('-', ' ')}
                  </span>
                </div>
                <p className="text-sm text-green-400 mb-2">{booking.bikeModel} - {booking.serviceType}</p>
                <p className="text-xs text-green-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {booking.preferredDate} at {booking.preferredTime}
                </p>
              </div>
            ))}
            {filteredBookings.length === 0 && (
              <div className="text-center text-green-500 py-8">
                <p>No bookings found matching your criteria</p>
              </div>
            )}
          </div>

          {/* Booking Details */}
          <div className="bg-green-950/50 border border-green-800/40 rounded-lg p-6">
            <div>
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
                      onClick={() => updateBookingStatus(selectedBooking.id, 'in-progress')}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg shadow-purple-600/30 border border-purple-500/50"
                    >
                      IN PROGRESS
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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gradient-to-br from-green-950/90 to-gray-950/90 backdrop-blur-xl border border-green-800/50 rounded-lg p-3 shadow-lg shadow-green-900/30">
        <p className="text-green-300 font-medium mb-2">{`${label} 2024`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-green-200 text-sm">
            <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
            {entry.name}: {entry.name === 'Growth' ? `${entry.value}%` : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
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

          {/* Monthly Growth Chart */}
          <div className="mb-8">
            <div className="bg-gradient-to-br from-green-950/40 to-gray-950/60 backdrop-blur-xl border border-green-800/30 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-60" />
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-200">Monthly Growth Analysis</h3>
                </div>
                
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="requestsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#065f46" opacity={0.3} />
                      <XAxis 
                        dataKey="month" 
                        stroke="#16a34a" 
                        fontSize={12}
                        tick={{ fill: '#16a34a' }}
                      />
                      <YAxis 
                        stroke="#16a34a" 
                        fontSize={12}
                        tick={{ fill: '#16a34a' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="growth"
                        name="Growth"
                        stroke="#10b981"
                        strokeWidth={3}
                        fill="url(#growthGradient)"
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#10b981', stroke: '#065f46', strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Growth Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-green-800/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-200">+62%</div>
                    <div className="text-sm text-green-400">6-Month Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-200">+12.5%</div>
                    <div className="text-sm text-green-400">Current Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-200">↗️ 2.1%</div>
                    <div className="text-sm text-green-400">Trend Acceleration</div>
                  </div>
                </div>
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
              <div className="flex items-center space-x-1.5 -ml-2">
                <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 border border-green-500/30 overflow-hidden">
                  <img 
                    src="logo.jpg" 
                    alt="Logo" 
                    className="w-full h-full object-cover"
                  />
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